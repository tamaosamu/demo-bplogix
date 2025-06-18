import { Alert } from "@/components/share/Alert";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import "../assets/styles/print.css";

import { SIZE_DATA } from "./data";

type Status = "ACTIVE" | "DONE" | "UNDONE";

interface DeliverySize {
  width: number;
  height: number;
  length: number;
  weight: number;
  isWeight: boolean;
}

interface OrderGoods {
  skuCode: string;
  snCode: string;
  productCode: string;
  quantity: number;
}

interface Goods {
  skuCode: string;
  snCode: string;
  productCode: string;
  quantity: number;
  scanQuantity: number;
  status: Status;
}

interface Waybill {
  orderCode?: string;
  mainOrderCode: string;
  name: string;
  children: {
    subOrderCode: string;
    goods: Goods[];
    size?: DeliverySize;
  }[];
  extras: SubOrderExtra[];
}

type ExtraType = "size" | "package" | "added"; // 渠道 包材 增值

// 发货附加服务
interface SubOrderExtra {
  code: string;
  name: string;
  type: ExtraType;
  scanQuantity?: number;
}

// 包材
const orderExtraData: SubOrderExtra[] = [
  {
    code: "BC-C-000001",
    name: "纸壳箱60",
    type: "package",
  },
  {
    code: "BC-C-000002",
    name: "纸壳箱80",
    type: "package",
  },
  {
    code: "BC-C-000007",
    name: "气泡袋60",
    type: "package",
  },
  {
    code: "ZZ-001",
    name: "拆箱服务",
    type: "added",
  },
  {
    code: "ZZ-002",
    name: "貼标服务",
    type: "added",
  },
];

interface Order {
  orderCode: string;
  deliveryCode: "SD-00" | "SD-01" | "SD-02" | "";
  children: OrderGoods[];
}

// 订单数据
const orderData: Order[] = [
  {
    orderCode: "OR250520001539",
    deliveryCode: "",
    children: [
      {
        skuCode: "SKU-1003",
        snCode: "SN-1003",
        productCode: "PR2411210003",
        quantity: 1,
      },
      {
        skuCode: "SKU-1004",
        snCode: "SN-1004",
        productCode: "PR2411210004",
        quantity: 2,
      },
      {
        skuCode: "SKU-1005",
        snCode: "SN-1005",
        productCode: "PR2411210005",
        quantity: 3,
      },
      {
        skuCode: "SKU-1006",
        snCode: "SN-1006",
        productCode: "PR2411210006",
        quantity: 100,
      },
    ],
  },
  {
    orderCode: "OR250520001540",
    deliveryCode: "",
    children: [
      {
        skuCode: "SKU-1003",
        snCode: "SN-1003",
        productCode: "PR2411210003",
        quantity: 1,
      },
      {
        skuCode: "SKU-1004",
        snCode: "SN-1004",
        productCode: "PR2411210004",
        quantity: 2,
      },
    ],
  },
  {
    orderCode: "OR250520001541",
    deliveryCode: "SD-02",
    children: [
      {
        skuCode: "SKU-1003",
        snCode: "SN-1003",
        productCode: "PR2411210003",
        quantity: 1,
      },
    ],
  },
];

function Print() {
  // 当前扫描商品
  const [goodsCode, setGoodsCode] = useState<string>("PR2411210003");
  const [goodsCodes, setGoodsCodes] = useState<Set<string>>(new Set());
  const [goodsScanQuantity, setGoodsScanQuantity] = useState<number>(1);

  // 当前已扫描商品组
  const [currFindOrder, setFindOrder] = useState<Order>();
  const [currScanGoods, setCurrScanGoods] = useState<Goods>();
  const [goodsGroup, setGoodsGroup] = useState<Goods[]>([]);
  // const [currDelivery, setCurrDelivery] = useState<"yamato" | "sagawa">();
  const [currDeliverySize, setCurrDeliverySize] = useState<DeliverySize>({
    width: 20,
    height: 30,
    length: 10,
    weight: 0,
    isWeight: false,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [printOrder, setPrintOrder] = useState<boolean>(false);

  // 快递订单组
  const [waybill, setWaybill] = useState<Waybill>();

  const [qdData, setQdData] = useState("");

  const scanOnce = () => {
    console.log("扫描一次");
    console.log(goodsCode);

    const sd = SIZE_DATA.find((sd) => sd.id === goodsCode);
    if (sd) {
      setQdData(sd.id);
      return;
    }

    const extra = orderExtraData.find(
      (orderExtra) => orderExtra.code === goodsCode
    );

    if (extra) {
      let data = waybill;
      if (!data) {
        data = {
          mainOrderCode: "main-100001",
          name: "黑猫",
          children: [],
          extras: [],
        };
      }

      const extraByWaybill = data.extras.find(
        (orderExtra) => orderExtra.code === goodsCode
      );
      console.log(extraByWaybill);

      if (!extraByWaybill) {
        data.extras.push({
          ...extra,
          scanQuantity: 1,
        });
        setWaybill({ ...data });
      } else {
        setWaybill({
          ...data,
          extras: data.extras.map((item) =>
            item.code === goodsCode
              ? {
                  ...item,
                  scanQuantity: item.scanQuantity ? item.scanQuantity + 1 : 1,
                }
              : item
          ),
        });
      }
      return;
    }

    // 通过订单号加载全部商品
    const order = orderData.find((order) => order.orderCode === goodsCode);
    if (order) {
      // 找到订单后不执行后续逻辑

      console.log(order);
      setFindOrder(order);
      // setCurrDelivery(order.deliveryCode);
      setQdData(order.deliveryCode);

      setGoodsGroup(
        order.children.map((goods) => {
          return { ...goods, scanQuantity: 0, status: "UNDONE" };
        })
      );

      return;
    }

    // 首先匹配多个含有商品的订单
    const goodsCodesTemp = goodsCodes.add(goodsCode);
    const matchedOrders = orderData.filter((order) => {
      // 收集该订单中所有商品的 code
      const codesInOrder = new Set<string>();
      order.children.forEach((goods) => {
        if (goodsCodes.has(goods.skuCode) || goods.skuCode === goodsCode)
          codesInOrder.add(goods.skuCode);
        if (goodsCodes.has(goods.snCode) || goods.snCode === goodsCode)
          codesInOrder.add(goods.snCode);
        if (
          goodsCodes.has(goods.productCode) ||
          goods.productCode === goodsCode
        )
          codesInOrder.add(goods.productCode);
      });

      // 检查是否包含所有输入的 code
      for (const code of goodsCodesTemp) {
        console.log(codesInOrder, code);
        if (!codesInOrder.has(code)) {
          return false; // 有一个不包含就不匹配
        }
      }
      console.log(true);
      return true; // 所有 code 都包含，匹配成功
    });

    if (matchedOrders.length === 0) {
      alert("没有匹配到任何订单");
    }

    console.log(matchedOrders);
    setGoodsCodes(goodsCodesTemp);

    // 从 matchedOrders 中找出 children 数量最少的那个订单
    const minOrder = matchedOrders.reduce((min, curr) => {
      if (!min || curr.children.length < min.children.length) {
        return curr;
      }
      return min;
    });

    console.log(minOrder);
    // 保存当前帅选出来的订单
    setFindOrder(minOrder);
    // setCurrDelivery(minOrder.deliveryCode);
    setQdData(minOrder.deliveryCode);

    console.log(goodsGroup);
    if (goodsGroup.length === 0) {
      const goodsGroupTemp = minOrder.children.map((goods) => {
        let statusValue: Status = "UNDONE";
        if (goods.productCode === goodsCode) {
          statusValue = "ACTIVE";
          if (goods.quantity > 3) {
            setCurrScanGoods({
              ...goods,
              status: statusValue,
              scanQuantity: 0,
            });
            setOpen(true);
          } else {
            return {
              ...goods,
              scanQuantity: goodsScanQuantity,
              status: statusValue,
            };
          }
        }

        return { ...goods, scanQuantity: 0, status: statusValue };
      });
      setGoodsGroup(goodsGroupTemp);
    } else {
      const goodsGroupTemp = goodsGroup.map((goods) => {
        if (goods.productCode === goodsCode) {
          if (goods.scanQuantity + goodsScanQuantity > goods.quantity) {
            alert("当前商品已经达到出库最大数量");
          } else {
            if (goods.scanQuantity + 3 < goods.quantity) {
              // setCurrScanGoods({ ...goodsByGroup })
              setOpen(true);
            } else {
              const statusValue: Status =
                goods.scanQuantity + 1 === goods.quantity ? "DONE" : "ACTIVE";
              // 如果已存在，则 quantity + 1
              return {
                ...goods,
                scanQuantity: goods.scanQuantity + 1,
                status: statusValue,
              };
            }
          }
        }
        return { ...goods };
      });
      setGoodsGroup(goodsGroupTemp);
    }

    return;
  };

  const scanQuantitySubmit = () => {
    console.log(goodsScanQuantity);

    if (currScanGoods) {
      if (
        currScanGoods.scanQuantity + goodsScanQuantity >
        currScanGoods.quantity
      ) {
        alert("超过最大出库数");
        return;
      }

      const goodsByGroup = goodsGroup.find(
        (item) => item.productCode === currScanGoods.productCode
      );

      if (!goodsByGroup) {
        setGoodsGroup([
          ...goodsGroup,
          {
            ...currScanGoods,
            scanQuantity: currScanGoods.scanQuantity + goodsScanQuantity,
            status: "ACTIVE",
          },
        ]);
      } else {
        setGoodsGroup(
          goodsGroup.map((item) =>
            item.productCode === currScanGoods.productCode
              ? {
                  ...item,
                  scanQuantity: item.scanQuantity + goodsScanQuantity,
                  status:
                    item.scanQuantity + goodsScanQuantity === item.quantity
                      ? "DONE"
                      : "ACTIVE",
                }
              : item
          )
        );
      }
    }
    setGoodsScanQuantity(1);
    setOpen(false);
  };

  // 分单业务
  const subOrder = () => {
    let data = waybill;
    if (!data) {
      data = {
        mainOrderCode: "main-100001",
        name: "黑猫",
        children: [],
        extras: [],
      };
    }

    const subGoodsGroup = goodsGroup.filter(
      (goods) => goods.quantity === goods.scanQuantity
    );
    if (subGoodsGroup.length === 0) {
      alert("没有可以出库的商品");
      return;
    }

    data.children.push({
      subOrderCode: "sub-100001-1",
      goods: subGoodsGroup,
    });
    setWaybill({ ...data });
    setGoodsGroup([
      ...goodsGroup.filter((goods) => goods.quantity !== goods.scanQuantity),
    ]);
  };

  // 打单业务
  const orderEnd = () => {
    console.log("结束扫描");
    alert("结束扫描");
  };

  return (
    <div className="h-full" style={{ height: "100vh" }}>
      <div className="flex flex-col gap-4 bg-orange-300 h-full p-4">
        {/* 横向整行 */}
        <div className="flex w-full bg-white p-2 rounded text-xs">
          <div className="flex-1">
            当前批次：
            <Button className="text-xs h-7">AB11223344</Button>
          </div>
          <div className="flex-1 flex items-center">
            批次出库进度：<span className="text-red-500 text-xl">41</span>/100
          </div>
          <div className="flex-1">
            已出库订单（上一个）：
            <Button className="text-xs h-7">OR250520001539</Button>
          </div>
        </div>

        {/* 三列内容 */}
        <div className="flex gap-4 flex-1 w-full">
          <div className="flex-1 gap-2 flex flex-col">
            <div className="p-2 bg-white rounded flex justify-between">
              <span>分单详情</span>
              <span></span>
            </div>

            {waybill &&
              waybill.children.map((subOrder) => (
                <ul className="p-2 bg-white rounded">
                  <li className="border-b-1 text-gray-700">
                    {subOrder.subOrderCode}
                  </li>
                  {subOrder.goods.map((goods) => (
                    <li className="flex justify-between text-sm text-gray-400 ">
                      <span>{goods.productCode}</span>
                      <span>{goods.scanQuantity}</span>
                    </li>
                  ))}
                </ul>
              ))}
            
            <div className="p-2 bg-white rounded flex flex-col text-xs text-gray-500">
              <span>演示数据：</span>
              <span>---------------</span>
              <span>订单：</span>
              <span>OR250520001539</span>
              <span>OR250520001540</span>
              <span>OR250520001541</span>
              <span>商品：</span>
              <span>PR2411210003 / SKU-1003 / SN-1003</span>
              <span>PR2411210004 / SKU-1004 / SN-1004</span>
              <span>PR2411210005 / SKU-1005 / SN-1005</span>
              <span>PR2411210006 / SKU-1006 / SN-1006</span>
              <span>包材：</span>
              <span>BC-C-000001 / BC-C-000002 / BC-C-000007</span>
              <span>增值：</span>
              <span>ZZ-001 / ZZ-002</span>
              <span>尺寸：</span>
              <span>SD-01 / SD-02 / SD-03</span>
            </div>

          </div>
          <div className="flex-2">
            <div className="h-full grid grid-rows-[auto_1fr_auto] grid-cols-[4fr_1fr] gap-4">
              {/* 上部：跨两列 */}
              <div className="bg-white rounded col-span-2 p-2 flex gap-2">
                <Badge>订单号</Badge>
                <span>{currFindOrder?.orderCode ?? "请扫描商品或订单号"}</span>
              </div>
              <div className="col-span-2 bg-white p-2 rounded">
                <ul className="text-sm">
                  <li className="border-b-1 flex p-1 gap-2">
                    <span className="flex-grow truncate">
                      SKU Code / SN Code / Product Code
                    </span>
                    <span className="whitespace-nowrap">已扫 / 应扫</span>
                    <span className="whitespace-nowrap w-[60px]">操作</span>
                  </li>
                  {goodsGroup.map((goods) => (
                    <li className="flex p-1 gap-2" key={goods.productCode}>
                      <span className="flex-grow truncate">
                        {goods.productCode}
                      </span>
                      <span className="whitespace-nowrap w-[70px] text-center">
                        {goods.scanQuantity} / {goods.quantity}
                      </span>
                      <span className="whitespace-nowrap gap-2 flex">
                        {/* <Button className="h-[20px] text-xs" >清空数量</Button> */}
                        <Button className="h-[20px] text-xs">清空</Button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 左下 */}
              <div className="rounded h-[40px]">
                <Input
                  placeholder="商品码 / SKU码 / SN码 / 订单号 / 包材码 / 增值码 / 尺寸码 / 批次码"
                  className="w-full h-full bg-white border-0"
                  defaultValue={goodsCode}
                  onChange={(e) => setGoodsCode(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      scanOnce();
                    }
                  }}
                />
              </div>

              {/* 右下 */}
              <div className="rounded h-[40px] flex gap-2">
                <Button className="flex-1 h-full" onClick={() => subOrder()}>
                  分单
                </Button>
                <Button className="flex-1 h-full" onClick={() => orderEnd()}>
                  出库
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-2">
            <ul className="p-2 bg-white rounded">
              <li className="flex justify-end">
                <span className="bg-amber-500 text-white rounded p-1 text-xs">
                  包材
                </span>
              </li>
              <li className="flex gap-2">
                {waybill?.extras
                  .filter((e) => e.type === "package")
                  .map((item) => (
                    <Badge className="bg-orange-300" key={item.code}>
                      {item.name} X{" "}
                      <span className="text-lg">{item.scanQuantity}</span>
                    </Badge>
                  ))}
              </li>
            </ul>
            <ul className="p-2 bg-white rounded">
              <li className="flex justify-end">
                <span className="bg-amber-500 text-white rounded p-1 text-xs">
                  增值
                </span>
              </li>
              <li className="flex gap-2">
                {waybill?.extras
                  .filter((e) => e.type === "added")
                  .map((item) => (
                    <Badge className="bg-orange-300" key={item.code}>
                      {item.name} X{" "}
                      <span className="text-lg ">{item.scanQuantity}</span>
                    </Badge>
                  ))}
              </li>
            </ul>
            <ul className="p-2 bg-white rounded flex flex-col gap-2">
              <li className="flex justify-end">
                <span className="bg-amber-500 text-white rounded p-1 text-xs">
                  尺寸
                </span>
              </li>

              <li className="flex gap-8">
                <div className="flex-1 flex flex-col gap-2">
                  {!qdData && (
                    <div
                      className={`w-[120px] h-[120px] relative flex border-2 border-dashed border-gray-300 justify-center items-center text-2xl`}
                    >
                      <span className="text-gray-400">尺寸</span>
                    </div>
                  )}

                  {SIZE_DATA &&
                    SIZE_DATA.map(
                      (item) =>
                        qdData === item.id && (
                          <div
                            className={`${item.id} w-[120px] h-[120px] relative flex justify-center items-center text-2xl`}
                          >
                            {item.name}
                          </div>
                        )
                    )}
                </div>
                <ul className="flex-1 flex flex-col gap-2">
                  <li className="flex gap-2">
                    <Label>长</Label>
                    <Input
                      disabled
                      value={currDeliverySize.length}
                      onChange={(e) =>
                        setCurrDeliverySize({
                          ...currDeliverySize,
                          length: parseInt(e.currentTarget.value),
                        })
                      }
                    />
                  </li>
                  <li className="flex gap-2">
                    <Label>宽</Label>
                    <Input
                      disabled
                      value={currDeliverySize.width}
                      onChange={(e) =>
                        setCurrDeliverySize({
                          ...currDeliverySize,
                          width: parseInt(e.currentTarget.value),
                        })
                      }
                    />
                  </li>
                  <li className="flex gap-2">
                    <Label>高</Label>
                    <Input
                      disabled
                      value={currDeliverySize.height}
                      onChange={(e) =>
                        setCurrDeliverySize({
                          ...currDeliverySize,
                          height: parseInt(e.currentTarget.value),
                        })
                      }
                    />
                  </li>
                </ul>
              </li>

              <li className="flex gap-8 h-[36px]">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-full flex justify-between items-center">
                    <Label>是否称重</Label>
                    <Switch
                      checked={currDeliverySize.isWeight}
                      onCheckedChange={() =>
                        setCurrDeliverySize({
                          ...currDeliverySize,
                          isWeight: !currDeliverySize.isWeight,
                        })
                      }
                    />
                  </div>
                </div>
                <ul className="flex-1 flex flex-col gap-2">
                  <li className="flex gap-2">
                    {currDeliverySize.isWeight && (
                      <>
                        <Label>重</Label>
                        <Input
                          value={currDeliverySize.weight}
                          onChange={(e) =>
                            setCurrDeliverySize({
                              ...currDeliverySize,
                              weight: parseInt(e.currentTarget.value),
                            })
                          }
                        />
                      </>
                    )}
                  </li>
                </ul>
              </li>
            </ul>
            <div className="flex-1 h-full bg-white rounded p-2">
              <div>
                <span className="bg-amber-500 text-white rounded p-1 text-xs">
                  设置
                </span>
              </div>
              <div className="flex gap-8 h-[36px]">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-full flex justify-between items-center">
                    <Label>补打面单</Label>
                    <Switch
                      checked={printOrder}
                      onCheckedChange={() =>
                        setPrintOrder(!printOrder)
                      }
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2"></div>
              </div>
            </div>
          </div>
        </div>

        <Alert title="请输入扫描数量(应扫总数>3)" open={open}>
          <Input
            type="number"
            max={currScanGoods?.quantity}
            onChange={(e) =>
              setGoodsScanQuantity(parseInt(e.currentTarget.value))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                scanQuantitySubmit();
              }
            }}
          />
        </Alert>
      </div>
    </div>
  );
}

export default Print;
