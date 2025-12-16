document.addEventListener('DOMContentLoaded', function () {
    // 数量选择器功能
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.minus');
        const plusBtn = selector.querySelector('.plus');
        const input = selector.querySelector('.quantity-input');

        minusBtn.addEventListener('click', function () {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', function () {
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });

    // 添加到购物车功能
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const quantity = parseInt(productCard.querySelector('.quantity-input').value);
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('¥', ''));

            // 显示添加成功消息
            const originalText = this.textContent;
            this.textContent = '已添加';
            this.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);

            // 从本地存储获取购物车数据
            let cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
            
            // 检查商品是否已在购物车中
            const existingItemIndex = cartData.findIndex(item => item.name.includes(productName));
            
            if (existingItemIndex > -1) {
                // 商品已存在，增加数量
                cartData[existingItemIndex].quantity += quantity;
            } else {
                // 商品不存在，添加新商品
                cartData.push({
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                });
            }
            
            // 保存到本地存储
            localStorage.setItem('snackCart', JSON.stringify(cartData));
            
            console.log(`已将 ${productName} x${quantity} 添加到购物车`);
        });
    });

    // 底部导航切换
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            // 如果点击的是当前活动项，则阻止默认行为
            if (this.classList.contains('active')) {
                e.preventDefault();
            }
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});