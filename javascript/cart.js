document.addEventListener('DOMContentLoaded', function () {
    const emptyCart = document.querySelector('.empty-cart');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const browseBtn = document.getElementById('browseBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalPriceElement = document.getElementById('totalPrice');
    
    // 选中的商品ID列表
    let selectedItems = [];
    // 全选状态
    let isAllSelected = false;

    // 检查本地存储中是否有购物车数据
    function checkCart() {
        const cartData = localStorage.getItem('snackCart');
        if (cartData && JSON.parse(cartData).length > 0) {
            // 有商品，显示购物车内容
            emptyCart.style.display = 'none';
            cartItems.style.display = 'block';
            cartSummary.style.display = 'block';
            renderCartItems();
        } else {
            // 没有商品，显示空状态
            emptyCart.style.display = 'flex';
            cartItems.style.display = 'none';
            cartSummary.style.display = 'none';
            // 清空选中列表
            selectedItems = [];
            isAllSelected = false;
        }
    }

    // 渲染购物车商品
    function renderCartItems() {
        const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
        cartItems.innerHTML = '';
        
        // 添加全选按钮
        const selectAllElement = document.createElement('div');
        selectAllElement.className = 'select-all';
        selectAllElement.innerHTML = `
            <div class="checkbox ${isAllSelected ? 'checked' : ''}" id="selectAllCheckbox"></div>
            <span>全选</span>
        `;
        cartItems.appendChild(selectAllElement);
        
        // 为全选按钮添加事件监听
        document.getElementById('selectAllCheckbox').addEventListener('click', toggleSelectAll);

        let totalPrice = 0;

        cartData.forEach((item, index) => {
            // 检查商品是否被选中
            const isChecked = selectedItems.includes(index);
            // 只有选中的商品才计算总价
            if (isChecked) {
                totalPrice += item.price * item.quantity;
            }

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                        <div class="checkbox ${isChecked ? 'checked' : ''}" data-index="${index}"></div>
                        <div class="item-image">${item.name}图片</div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-price">¥${item.price.toFixed(2)}</div>
                            <div class="item-actions">
                                <div class="quantity-controls">
                                    <div class="quantity-btn minus" data-index="${index}">-</div>
                                    <div class="quantity">${item.quantity}</div>
                                    <div class="quantity-btn plus" data-index="${index}">+</div>
                                </div>
                                <button class="remove-btn" data-index="${index}">删除</button>
                            </div>
                        </div>
                    `;
            cartItems.appendChild(cartItem);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        // 添加事件监听器
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function () {
                updateQuantity(parseInt(this.getAttribute('data-index')), -1);
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function () {
                updateQuantity(parseInt(this.getAttribute('data-index')), 1);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                removeItem(parseInt(this.getAttribute('data-index')));
            });
        });
        
        // 为商品复选框添加事件监听
        document.querySelectorAll('.cart-item .checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                toggleItemSelection(index);
            });
        });
    }
    
    // 切换商品选中状态
    function toggleItemSelection(index) {
        const indexInSelected = selectedItems.indexOf(index);
        if (indexInSelected > -1) {
            // 取消选中
            selectedItems.splice(indexInSelected, 1);
            isAllSelected = false;
        } else {
            // 选中商品
            selectedItems.push(index);
            // 检查是否所有商品都被选中
            const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
            isAllSelected = selectedItems.length === cartData.length;
        }
        renderCartItems();
    }
    
    // 切换全选状态
    function toggleSelectAll() {
        isAllSelected = !isAllSelected;
        const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
        
        if (isAllSelected) {
            // 全选：选中所有商品
            selectedItems = cartData.map((_, index) => index);
        } else {
            // 取消全选：清空选中列表
            selectedItems = [];
        }
        
        renderCartItems();
    }

    // 更新商品数量
    function updateQuantity(index, change) {
        const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
        cartData[index].quantity += change;

        if (cartData[index].quantity <= 0) {
            // 如果商品数量为0，从购物车中移除
            cartData.splice(index, 1);
            // 同时从选中列表中移除
            const indexInSelected = selectedItems.indexOf(index);
            if (indexInSelected > -1) {
                selectedItems.splice(indexInSelected, 1);
            }
            // 更新选中列表中所有大于当前索引的项
            selectedItems = selectedItems.map(itemIndex => 
                itemIndex > index ? itemIndex - 1 : itemIndex
            );
        }

        localStorage.setItem('snackCart', JSON.stringify(cartData));
        checkCart();
    }

    // 删除商品
    function removeItem(index) {
        const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
        cartData.splice(index, 1);
        localStorage.setItem('snackCart', JSON.stringify(cartData));
        
        // 同时从选中列表中移除
        const indexInSelected = selectedItems.indexOf(index);
        if (indexInSelected > -1) {
            selectedItems.splice(indexInSelected, 1);
        }
        // 更新选中列表中所有大于当前索引的项
        selectedItems = selectedItems.map(itemIndex => 
            itemIndex > index ? itemIndex - 1 : itemIndex
        );
        
        checkCart();
    }

    // 去首页逛逛
    browseBtn.addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // 立即结算
    checkoutBtn.addEventListener('click', function () {
        const cartData = JSON.parse(localStorage.getItem('snackCart') || '[]');
        
        if (selectedItems.length === 0) {
            alert('请先选择要结算的商品');
            return;
        }
        
        // 获取选中的商品
        const selectedProducts = selectedItems.map(index => cartData[index]);
        
        // 计算选中商品的总价
        const totalAmount = selectedProducts.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        alert(`您已选择 ${selectedItems.length} 件商品，总价：¥${totalAmount.toFixed(2)}\n结算功能即将开放，敬请期待！`);
        // 在实际应用中，这里会跳转到结算页面
    });

    // 初始化检查购物车状态
    checkCart();
});