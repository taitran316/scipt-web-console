const TARGET_REACH = 1000;

function parseReachNumber(text) {
  text = text.trim().toUpperCase();
  if (text.includes('K')) {
    const num = parseFloat(text.replace('K', '').replace(',', '.'));
    return num * 1000;
  }
  return parseInt(text.replace(/[^0-9]/g, ''));
}

// Dừng script cũ nếu đang chạy
if (window._scrollInterval) {
  clearInterval(window._scrollInterval);
}

window._scrollInterval = setInterval(() => {
  const spans = document.querySelectorAll('span.x135b78x');
  
  for (let span of spans) {
    // Bỏ qua bài đã tìm thấy lần trước
    if (span.dataset.visited === 'true') continue;
    
    const text = span.innerText.trim();
    if (!text) continue;
    
    const num = parseReachNumber(text);
    
    if (!isNaN(num) && num > TARGET_REACH) {
      // Đánh dấu là đã xử lý
      span.dataset.visited = 'true';
      span.style.outline = '3px solid red';
      span.style.backgroundColor = 'yellow';
      
      // Dừng và scroll đến bài này
      clearInterval(window._scrollInterval);
      span.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(`✅ Dừng tại reach: ${text} — Chạy lại script để tìm bài tiếp theo`);
      return;
    }
  }

  window.scrollBy({ top: 1500, behavior: 'smooth' });

  const isBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 100;
  if (isBottom) {
    clearInterval(window._scrollInterval);
    console.log('🏁 Đã hết trang, không còn bài nào reach >', TARGET_REACH);
  }
}, 1000);

console.log('🚀 Đang tìm bài tiếp theo có reach >', TARGET_REACH);
