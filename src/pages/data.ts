
export type QdData = {
    id: string;
    name: string;
}

export const QD_DATA: QdData[] = [
{
    id: 'Q-00',
    name: '小包',
},
{
    id: 'Q-01',
    name: 'コンパクト',
},
{
    id: 'Q-02',
    name: '宅急便',
},
{
    id: 'Q-03',
    name: '黑猫代引',
},
{
    id: 'Q-04',
    name: '佐川急便',
},
{
    id: 'Q-05',
    name: '佐川代引',
}]

export type PackageData = {
    id: string
    name: string
}

export const PACKAGE_DATA: PackageData[] = [{
    id: 'P-01',
    name: '纸壳箱60',
},
{
    id: 'P-02',
    name: '纸壳箱80',
},
{
    id: 'P-03',
    name: '气泡袋60',
},
{
    id: 'P-04',
    name: '超特大包',
}]

export type AddedData = {
    id: string;
    name: string;
}

export const ADDED_DATA: AddedData[] = [{
    name: '拆箱服务',
    id: 'AD-01',
},{
    name: '貼标服务',
    id: 'AD-02',
}]

export type SizeData = {
    id: string;
    name: string;
    image: string;
}

export const SIZE_DATA: SizeData[] = [{
    name: '三边Σ40',
    id: 'SD-01',
    image: 'images/box-40.png',
},{
    name: '三边Σ60',
    id: 'SD-02',
    image: 'images/box-60.png',
},{
    name: '三边Σ80',
    id: 'SD-03',
    image: 'images/box-80.png',
}]