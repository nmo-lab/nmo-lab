/* ==========================================================================
   NMO-LAB · i18n.js  中英文切換（EN / 中文）
   做兩件事：
   1) 資料翻譯：data/*.json 與 img 各系列資料夾的 _series.json 裡，任何欄位 xxx 都可以另加 xxx_zh（中文）、xxx_en（英文）。
      目前語言有對應欄位就用它，沒有就用原本的 xxx。例：{"title":"Harbour","title_zh":"港口"}
   2) 介面文字翻譯：app.js／index.html 裡的英文介面文字，在選中文時由下面的字典自動換成中文。
      要改某個詞，就改 EXACT 字典；有數字或名字夾在句子裡的，改 PATTERNS。
   語言存在 localStorage（nmo-lab.lang）；沒選過時依瀏覽器語言決定。切換時會重新載入同一頁。
   ========================================================================== */
(function () {
  const KEY = "nmo-lab.lang";
  let lang = "";
  try { lang = localStorage.getItem(KEY) || ""; } catch (e) { /* ignore */ }
  if (lang !== "zh" && lang !== "en") lang = /^zh/i.test(navigator.language || "") ? "zh" : "en";
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";

  /* ---------- 1. 資料翻譯 ---------- */
  function localize(v) {
    if (Array.isArray(v)) return v.map(localize);
    if (!v || typeof v !== "object") return v;
    const out = {};
    Object.keys(v).forEach((k) => {
      if (/_(zh|en)$/.test(k)) return;
      const alt = v[k + "_" + lang];
      out[k] = localize(alt !== undefined && alt !== "" ? alt : v[k]);
    });
    return out;
  }

  /* ---------- 2. 介面字典（英文 → 繁體中文） ---------- */
  const EXACT = {
    /* 頂欄／導覽（洽詢另外處理：手機版維持英文） */
    "Overview": "總覽", "Index": "索引", "Work": "作品", "Archive": "典藏", "Shop": "商品", "Editions": "實體作品",
    "Digital Files": "數位檔案", "About": "關於", "Bag": "購物車", "Saved": "收藏", "Saved ✓": "已收藏", "Save": "收藏",
    "Home": "回首頁", "Back": "返回", "Main": "主選單", "Series": "系列", "Product type": "商品類型", "Info": "說明",
    "Back to top": "回到頂端", "Close": "關閉", "Language": "語言",
    /* 頁尾 */
    "Newsletter": "電子報", "Subscribe to The Dispatch: new work, shop updates, and the notes behind the pictures.": "訂閱《Dispatch》，第一時間收到新作、商品上架與創作筆記。",
    "Email": "電子郵件", "Submit": "訂閱",
    /* 作品卡／按鈕 */
    "Details": "查看詳情", "Add to Bag": "加入購物車", "In Bag · View": "已加入・查看購物車", "View Bag": "查看購物車",
    "Sold Out": "已售完", "Reserved": "已預訂", "Enquire": "來信詢問", "Price on request": "價格請來信洽詢",
    "Price on Request — Enquire": "價格請來信洽詢", "Sold Out — Enquire": "已售完・來信詢問", "Reserved — Enquire": "已預訂・來信詢問",
    "View Series ↗": "看整個系列 ↗", "View ↗": "查看 ↗", "View": "查看", "Selected Projects": "更多系列", "DATE": "日期",
    "Show / hide thumbnails": "顯示／隱藏縮圖", "Save for Later": "加入收藏", "Remove": "移除",
    "Context": "作品說明", "Specifications": "規格", "Option": "尺寸與版本", "Format": "尺寸與版本", "Price": "售價", "Work details": "作品詳情",
    /* 提示 */
    "Added to Bag": "已加入購物車", "Saved for later": "已加入收藏", "Link copied": "已複製連結", "Copied": "已複製",
    "Limited to one per order": "此作品每筆訂單限購 1 件", "Order summary copied": "已複製訂單內容",
    /* 收藏頁 */
    "Works you save for later are kept on this device. Use Copy Link to open the same selection on another device, or download it as a contact sheet (PDF).": "收藏的作品會保存在這台裝置上。使用「複製連結」可在其他裝置查看；點選「縮圖總覽（PDF）」可下載收藏清單。",
    "Nothing saved yet. Open any work and choose Save for Later.": "目前還沒有收藏的作品。看到喜歡的，點「加入收藏」就會放在這裡。",
    "Copy Link": "複製連結", "Contact Sheet (PDF)": "縮圖總覽（PDF）", "Enquire by Email": "來信詢問", "Clear": "全部清除",
    /* Bag */
    "Your bag is empty.": "購物車是空的。",
    "Available now": "現正販售", "Add more": "再看看其他作品", "Order summary": "訂單摘要", "Subtotal": "商品小計", "Shipping": "運費",
    "Calculated at checkout": "結帳時計算", "None (digital)": "免運費（數位商品）", "Checkout": "結帳", "Continue Browsing": "繼續瀏覽",
    "Limited editions are held for you once your order request is confirmed. You will not be charged at this step.": "訂單確認後，我們會為你保留限量作品。這個步驟不會收費。",
    "Decrease": "減少", "Increase": "增加", "Decrease quantity (removes the item at 1)": "減少數量（剩 1 件時會移除商品）",
    /* Checkout */
    "Edit Bag": "修改購物車", "1 · Contact": "1 · 聯絡資料", "2 · Delivery": "2 · 配送資訊", "3 · Notes": "3 · 備註",
    "Name *": "姓名 *", "Email *": "電子郵件 *", "Phone": "手機", "Region *": "配送地區 *", "Select…": "請選擇", "Address *": "地址 *",
    "City *": "縣市 *", "Postal code *": "郵遞區號 *", "Message (optional)": "備註（選填）", "Framing, gift note, deadline…": "例如：裝框需求、送禮卡片、希望到貨的日期",
    "Digital files are delivered by email after payment is confirmed.": "數位檔會在確認付款後，以電子郵件寄給你。",
    "I have read the shipping and returns information.": "我已閱讀運送與退換貨說明",
    "Continue — Send by Email": "下一步：以電子郵件送出訂單", "Place Order Request": "送出訂單",
    "You will not be charged yet.": "目前尚未收費。", "Free": "免運費", "Select region": "請先選擇配送地區", "To be confirmed": "待確認", "Total": "總計",
    "Sending…": "送出中…", "We could not send your request automatically.": "訂單無法自動送出。", "Send it by email instead": "改用電子郵件寄出",
    /* Order */
    "Order request received": "已收到你的訂單", "One last step": "還差最後一步", "Order not found": "找不到這筆訂單", "Order": "訂單",
    "We could not find this order on this device.": "這台裝置上找不到這筆訂單的紀錄。", "Back to Work": "回到作品",
    "Your order request is ready. Send it by email so we can confirm availability and reply with payment instructions.": "訂單已經準備好了。請用電子郵件寄給我們，確認庫存後會回信告訴你付款方式。",
    "Send Order by Email": "以電子郵件寄出訂單", "Copy Order Summary": "複製訂單內容", "Payment": "付款方式",
    "We confirm availability and the final shipping cost.": "我們會確認庫存與最終運費。",
    "You receive payment instructions by email.": "你會收到說明付款方式的電子郵件。", "You receive payment instructions.": "你會收到說明付款方式的訊息。",
    "We pack and ship your order, or send your digital files.": "我們會包裝並寄出商品，或把數位檔寄給你。",
    "We send your digital files after payment.": "付款完成後，我們會把數位檔寄給你。",
  };
  const PATTERNS = [
    [/^Saved \((\d+)\)$/, (m) => `收藏 (${m[1]})`],
    [/^Bag \((\d+)\)$/, (m) => `購物車 (${m[1]})`],
    [/^Order summary \((\d+)\)$/, (m) => `訂單摘要 (${m[1]})`],
    [/^Images \((\d+)\)$/, (m) => `共 ${m[1]} 張`],
    [/^Edition of (\d+)$/, (m) => `限量 ${m[1]} 份`],
    [/^(\d+) remaining$/, (m) => `尚餘 ${m[1]} 份`],
    [/^Edition of (\d+) · (\d+) remaining$/, (m) => `限量 ${m[1]} 份・尚餘 ${m[2]} 份`],
    [/^From (.+)$/, (m) => `${m[1]} 起`],
    [/^Only (\d+) available$/, (m) => `庫存僅剩 ${m[1]} 件`],
    [/^View series (.+)$/, (m) => `查看系列：${m[1]}`],
    [/^(\d+) works? added to (.+)$/, (m) => `已將 ${m[1]} 件作品加入${tr(m[2])}`],
    [/^(.+) \+ shipping$/, (m) => `${m[1]} + 運費`],
    [/^Free shipping to (.+) on editions over (.+)\.$/, (m) => `實體作品訂單滿 ${m[2]}，${m[1]}免運費。`],
    [/^© (\d+) NMO-LAB\. All rights reserved\.$/, (m) => `© ${m[1]} NMO-LAB 版權所有`],
    [/^(.*?) We reply within (.+) to confirm availability and send payment instructions\.$/, (m) => `${tr(m[1])}我們會在 ${tr(m[2])}內回覆，確認庫存並提供付款方式。`],
    [/^Thank you, (.+)\. A copy of this request is kept on this device\. We will email (.+) within (.+)\.$/, (m) => `謝謝你的訂購，${m[1]}。這份訂單的副本已保存在這台裝置上，我們會在 ${tr(m[3])}內寄信到 ${m[2]}。`],
    [/^(\d+) business days?$/, (m) => `${m[1]} 個工作天`],
    [/^(\d+)[–-](\d+) business days$/, (m) => `${m[1]}–${m[2]} 個工作天`],
    [/^Enquiry: (.+)$/, (m) => `詢問：${m[1]}`],
  ];
  function tr(s) {
    if (lang !== "zh" || !s) return s;
    if (Object.prototype.hasOwnProperty.call(EXACT, s)) return EXACT[s];
    for (let i = 0; i < PATTERNS.length; i++) { const m = PATTERNS[i][0].exec(s); if (m) return PATTERNS[i][1](m); }
    const sep = s.includes(" · ") ? " · " : s.includes(" — ") ? " — " : "";
    if (sep) { const parts = s.split(sep), t = parts.map(tr); if (t.some((x, i) => x !== parts[i])) return t.join(sep); }
    return s;
  }
  /* 中文標點：含中文的句子裡，英文用的「 · 」換成「・」，中文字後的說明括號換成全形（數量如「收藏 (2)」維持半形） */
  const CJK = /[\u3400-\u9fff]/;
  const zhPunct = (t) => (lang !== "zh" || !CJK.test(t) ? t
    : t.replace(/ · /g, "・").replace(/([\u3400-\u9fff）])\s?\(([^()]*[^\d\s()][^()]*)\)/g, "$1（$2）"));   /* 純數字的數量 (2) 維持半形 */
  const trNode = (n) => {
    const v = n.nodeValue; if (!v) return;
    if (lang === "zh" && v.trim() === "." && n.parentNode && n.parentNode.closest && n.parentNode.closest("#co-msg")) { n.nodeValue = "。"; return; }
    if (!/[A-Za-z]/.test(v)) return;
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(v), r = zhPunct(tr(m[2]));
    if (r !== m[2]) n.nodeValue = m[1] + r + m[3];
  };
  const ATTRS = ["aria-label", "placeholder", "title", "alt"];
  function walk(root) {
    if (root.nodeType === 3) { trNode(root); return; }
    if (root.nodeType !== 1) return;
    if (root.tagName === "SCRIPT" || root.tagName === "STYLE") return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = tw.nextNode())) trNode(n);
    const els = [root, ...root.querySelectorAll("[aria-label],[placeholder],[title]")];
    els.forEach((e) => ATTRS.forEach((a) => { if (e.hasAttribute && e.hasAttribute(a) && a !== "alt") { const v = e.getAttribute(a), r = tr(v); if (r !== v) e.setAttribute(a, r); } }));
  }
  function start() {
    if (lang !== "zh") return;
    walk(document.body); trNode(document.querySelector("title").firstChild || document.createTextNode(""));
    new MutationObserver((list) => {
      list.forEach((m) => {
        if (m.type === "childList") m.addedNodes.forEach(walk);
        else if (m.type === "characterData") trNode(m.target);
        else if (m.type === "attributes") { const v = m.target.getAttribute(m.attributeName), r = tr(v); if (r !== v) m.target.setAttribute(m.attributeName, r); }
      });
      const t = document.querySelector("title"); if (t && t.firstChild) trNode(t.firstChild);
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "placeholder", "title"] });
  }

  /* ---------- 3. 切換鈕（右上角 EN / 中文） ---------- */
  function mountSwitch() {
    const hd = document.querySelector(".hd"); if (!hd) return;
    const box = document.createElement("div"); box.className = "lang up"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "Language");
    [["en", "EN"], ["zh", "中文"]].forEach(([k, t], i) => {
      if (i) { const s = document.createElement("span"); s.textContent = "/"; s.setAttribute("aria-hidden", "true"); box.appendChild(s); }
      const b = document.createElement("button"); b.type = "button"; b.textContent = t; b.lang = k === "zh" ? "zh-Hant" : "en";
      b.setAttribute("aria-pressed", String(k === lang));
      b.onclick = () => { if (k === lang) return; try { localStorage.setItem(KEY, k); } catch (e) { /* ignore */ } location.reload(); };
      box.appendChild(b);
    });
    hd.appendChild(box);
  }

  window.NMO_I18N = { lang, localize, tr };
  const init = () => { mountSwitch(); start(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
