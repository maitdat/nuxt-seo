export function useSeoScore(meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
  }) {
    let score = 0;
    const suggestions: string[] = [];
  
    // 1. Kiểm tra độ dài tiêu đề
    if (meta.title.length >= 50 && meta.title.length <= 60) {
      score += 20;
    } else {
      suggestions.push('Tiêu đề nên dài từ 50-60 ký tự.');
    }
  
    // 2. Kiểm tra độ dài description
    if (meta.description.length >= 120 && meta.description.length <= 160) {
      score += 20;
    } else {
      suggestions.push('Description nên dài từ 120-160 ký tự.');
    }
  
    // 3. Kiểm tra og:title và og:description
    if (meta.ogTitle) score += 10;
    else suggestions.push('Thiếu thẻ og:title.');
  
    if (meta.ogDescription) score += 10;
    else suggestions.push('Thiếu thẻ og:description.');
  
    // 4. Kiểm tra og:image
    if (meta.ogImage.startsWith('http')) {
      score += 20;
    } else {
      suggestions.push('Thẻ og:image phải là một URL hợp lệ.');
    }
  
    // 5. Kiểm tra twitter card
    if (meta.twitterCard === 'summary_large_image') {
      score += 20;
    } else {
      suggestions.push('Thẻ twitterCard nên có giá trị "summary_large_image".');
    }
  
    return { score, suggestions };
  }
  