# 資料來源與查證邊界

整理日期：2026/10/19。查閱日期不等於原始資料發布日期，也不保證現場即時狀況。

## 店家範圍

| 店家 | 位置 | 來源與用途 | 限制 |
| --- | --- | --- | --- |
| 麻瓜健康簡餐 | 創新路753號 | [2026年受訪商家報導](https://buzzdaily.tw/store/aj2026052107)：地址、時段、現場參考價 | 菜單仍可能調整；外送價較高，不混用 |
| 滿足飯包創新店 | 創新路803號 | [Uber Eats 菜單](https://www.ubereats.com/tw/store/滿足飯包-創新店/KrElNAv1UBiRIEGl2nae7g)、[2024店家介紹](https://nowhot01.com/manzu-rice-burger/) | 外送價格；以歷史現場時段推算，需再次確認 |
| 丼曲丼曲 | 惠心街31號1樓 | [foodpanda 菜單](https://www.foodpanda.com.tw/restaurant/zwkt/jing-qu-jing-qu-ka-li-jing-fan/reviews)、[歷史店家名錄](https://footinder.com.tw/高雄市楠梓區/175222/) | 外送價格、歷史時段 |
| 老潮派鑄鐵鍋燒惠心店 | 惠心街172號 | [瘋美食彙整](https://www.fonfood.com/store/8486255)：地址、電話、菜單及分段時段 | 彙整頁含其他分店食記，收錄品項與價位應再向惠心店確認 |
| 小時厚牛排高雄楠梓店 | 土庫路68號 | [foodpanda 菜單](https://www.foodpanda.com.tw/restaurant/lv9t/xiao-shi-hou-niu-pai-gao-xiong-nan-zi-dian)、[歷史店家名錄](https://footinder.com.tw/高雄市楠梓區/83021/) | 外送價格、歷史時段 |
| 創新便當 | 創新路639號 | [學生食記](https://www.dcard.tw/f/food/p/241474722)：歷史店名、地址及價格 | 現行時段、現場價格及是否仍營業未確認；預設不列入營業中推薦 |
| 迷客夏高雄土庫店 | 清豐二路172號 | [官方門市名錄](https://www.milksha.com/store_detail.php)、[2026中南部菜單彙整](https://dailydietitian.com.tw/迷客夏菜單-最新價目表-新品情報-優惠快訊/) | 官方時段，區域參考價不等於門市即時報價 |
| 50嵐高雄土庫店 | 清豐二路170號 | [門市名錄](https://www.319papago.idv.tw/lifeinfo/50lan/50lan-15.html)、[2026高屏菜單彙整](https://dailydietitian.com.tw/50嵐北中南菜單價格-新品情報-優惠快訊/) | 未確認實體現行時段；不以舊外送頁停止接單推定實體歇業 |

## 食安官方查詢入口

- [高雄市政府衛生局：衛生違規專區](https://health.kcg.gov.tw/News.aspx?n=C47AA1C6624FC975&sms=315B44851C7A6EC1)
- [食藥署：食品查核及檢驗資訊平台](https://www.fda.gov.tw/testing/index.aspx)
- [高雄市政府衛生局：食安地圖資訊](https://health.kcg.gov.tw/Content_List.aspx?n=A7A2437594C1C6D0)

本版未完成八間實店的法定名稱、分店地址、案件範圍與後續改善狀態逐筆比對，統一保留「待查證」。以上是查詢入口，不是對任何收錄店家的安全證明。

## 虛構情境

「虛構・實驗室飯堂」「虛構・有紀錄飯堂」「虛構・待查證飯堂」「虛構・靈感茶飲」皆為程式測試資料。其案件日期、價格與時段完全虛構，沒有對應真實商家或案件，不附假官方來源。

## 更新方式

店家資料集中在 index.html 的 STORES 陣列，來源集中在 SOURCES 物件。確認新資料後修改對應項目，執行 node verify.cjs，再上傳 index.html。要新增真實食安紀錄時，應同時保留官方來源、案件日期、地址核對及後續狀態；不可僅依品牌名或留言推定。
