import type { Adjust, Option, Product } from "@/providers/fetchMenu/types";
import type { Dictionary, Order } from "@/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { create } from "mutative";
import { useState } from "react";
import {
  AdjustField,
  DialogActions,
  Label,
  OptionAmount,
  OptionButton,
  Options,
} from "./index.style";

interface OrderDialogProps {
  products: Dictionary<Product>; // TODO
  adjusts: Dictionary<Adjust>; // TODO
  options: Dictionary<Option>; // TODO
  productId: number;
  currentOrder?: Order;
  onClose: () => void;
  onSubmit: (order: Order) => void;
}

function OrderDialog({
  products,
  adjusts,
  options,
  productId,
  currentOrder,
  onClose,
  onSubmit,
}: OrderDialogProps) {
  const isEditMode = currentOrder !== undefined;

  const product = products[productId];
  const adjustList = product.adjustList
    .sort((a, b) => adjusts[a].sort - adjusts[b].sort)
    .reduce<number[]>((arr, id) => {
      const overrideAdjustId = arr.findIndex(
        (item) => adjusts[item].subType === adjusts[id].subType
      );

      if (overrideAdjustId === -1) {
        return [...arr, id];
      } else {
        return create(arr, (draft) => {
          draft[overrideAdjustId] = id;
        });
      }
    }, [])
    .map((id) => {
      const adjust = adjusts[id];

      return {
        ...adjust,
        optionList: adjust.optionList
          .filter((optionId) => product.availableOptions[optionId])
          .map((optionId) => options[optionId]),
      };
    });

  const [order, setOrder] = useState<Order>(
    currentOrder ?? {
      id: productId,
      amount: 1,
      adjusts: {},
      totalPrice: product.price,
    }
  );

  const handleSelectOption = (adjustId: number, optionId: number) => {
    return () => {
      const adjust = adjusts[adjustId];
      const { maxLimit } = adjust;

      const orderAdjust = order.adjusts[adjustId];
      const totalAmount = Object.values(orderAdjust?.options ?? {}).reduce(
        (sum, option) => sum + option.amount,
        0
      );

      const newAdjusts = create(order.adjusts, (draft) => {
        if (!draft[adjustId]) {
          draft[adjustId] = {
            id: adjustId,
            options: {},
          };
        }

        if (totalAmount !== maxLimit) {
          draft[adjustId].options[optionId] = {
            id: optionId,
            amount: (orderAdjust?.options?.[optionId]?.amount ?? 0) + 1,
          };
        } else {
          if (orderAdjust?.options?.[optionId]) {
            if (Object.keys(orderAdjust?.options).length === 1) {
              delete draft[adjustId];
            } else {
              delete draft[adjustId].options[optionId];
            }
          } else {
            if (maxLimit === 1) {
              draft[adjustId].options = {
                [optionId]: {
                  id: optionId,
                  amount: 1,
                },
              };
            }
          }
        }
      });

      const totalPrice =
        order.amount *
        Object.values(newAdjusts).reduce((sum, adjust) => {
          return (
            sum +
            Object.values(adjust.options).reduce((sum, option) => {
              return sum + option.amount * options[option.id].price;
            }, 0)
          );
        }, product.price);

      setOrder({
        ...order,
        adjusts: newAdjusts,
        totalPrice,
      });
    };
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(parseInt(event.target.value), 1);
    setOrder({
      ...order,
      amount: value,
      totalPrice: (order.totalPrice / order.amount) * value,
    });
  };

  const handleSubmit = () => {
    onSubmit(order);
    onClose();
  };

  return (
    <Dialog maxWidth="xs" open onClose={onClose}>
      <DialogTitle>
        <b>{product.name}</b>
      </DialogTitle>
      <DialogContent>
        {adjustList.map((adjust) => (
          <AdjustField key={adjust.id}>
            <Label>
              {adjust.isMandatory && "* "}
              {adjust.name}
              {!adjust.isMandatory && ` (最多可選${adjust.maxLimit}項)`}
            </Label>
            <Options>
              {adjust.optionList.map((option) => {
                const amount =
                  order.adjusts[adjust.id]?.options?.[option.id]?.amount ?? 0;
                return (
                  <OptionButton
                    key={option.id}
                    variant={
                      order.adjusts[adjust.id]?.options?.[option.id]
                        ? "contained"
                        : "outlined"
                    }
                    onClick={handleSelectOption(adjust.id, option.id)}
                  >
                    <div>{option.name}</div>
                    <div>{option.price > 0 && ` +${option.price}元`}</div>
                    {amount > 1 && <OptionAmount>{amount}</OptionAmount>}
                  </OptionButton>
                );
              })}
            </Options>
          </AdjustField>
        ))}
      </DialogContent>
      <DialogActions>
        <div>
          <Label>總金額: {order.totalPrice}元</Label>
          <TextField
            type="number"
            size="small"
            value={order.amount}
            onChange={handleAmountChange}
          />
        </div>
        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          disabled={adjustList.some((adjust) => {
            const orderAdjust = order.adjusts[adjust.id];

            return (
              adjust.isMandatory &&
              (!orderAdjust ||
                Object.keys(orderAdjust.options).length < adjust.minLimit ||
                Object.keys(orderAdjust.options).length > adjust.maxLimit)
            );
          })}
        >
          {isEditMode ? "更新商品" : "加入購物車"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDialog;
