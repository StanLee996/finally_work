// 轮播图功能
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideCount = dots.length;

    // 自动轮播
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    // 更新轮播图位置和指示点
    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // 点击指示点切换轮播图
    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateSlider();
        });
    });

    // 设置自动轮播间隔
    setInterval(nextSlide, 4000);

    // 添加到购物车功能
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.parentElement.querySelector('.product-name').textContent;
            const productPrice = parseFloat(this.parentElement.querySelector('.product-price').textContent.replace('¥', ''));
            
            // 从本地存储获取购物车数据
            let cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
            
            // 检查商品是否已在购物车中
            const existingItemIndex = cartData.findIndex(item => item.name.includes(productName));
            
            if (existingItemIndex > -1) {
                // 商品已存在，增加数量
                cartData[existingItemIndex].quantity += 1;
            } else {
                // 商品不存在，添加新商品
                cartData.push({
                    name: productName.replace('新品', '').trim(), // 移除新品标签
                    price: productPrice,
                    quantity: 1
                });
            }
            
            // 保存到本地存储
            localStorage.setItem('snackCart', JSON.stringify(cartData));
            
            // 显示添加成功提示
            alert(`已将 ${productName.replace('新品', '').trim()} 添加到购物车`);
        });
    });

    // 底部导航切换
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});