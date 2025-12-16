document.addEventListener('DOMContentLoaded', function () {
    // 编辑资料相关元素
    const editProfileBtn = document.querySelector('.edit-profile');
    const profileModal = document.getElementById('profileModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const usernameElement = document.querySelector('.username');
    const userDescElement = document.querySelector('.user-desc');
    const editUsernameInput = document.getElementById('editUsername');
    const editUserDescTextarea = document.getElementById('editUserDesc');

    // 头像相关元素
    const avatarElement = document.querySelector('.avatar');
    const avatarDisplay = document.getElementById('avatarDisplay');
    const avatarInput = document.getElementById('avatarInput');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    let currentAvatar = avatarElement.textContent; // 存储当前头像

    // 编辑资料按钮点击事件
    editProfileBtn.addEventListener('click', function () {
        // 填充当前值到输入框
        editUsernameInput.value = usernameElement.textContent;
        editUserDescTextarea.value = userDescElement.textContent;
        // 初始化头像预览
        if (avatarElement.style.backgroundImage) {
            avatarDisplay.style.backgroundImage = avatarElement.style.backgroundImage;
            avatarDisplay.textContent = '';
        } else {
            avatarDisplay.textContent = avatarElement.textContent;
            avatarDisplay.style.backgroundImage = '';
        }
        // 显示弹窗
        profileModal.classList.add('active');
    });

    // 取消按钮点击事件
    cancelBtn.addEventListener('click', function () {
        // 隐藏弹窗
        profileModal.classList.remove('active');
    });

    // 确定按钮点击事件
    confirmBtn.addEventListener('click', function () {
        // 获取新值
        const newUsername = editUsernameInput.value.trim();
        const newUserDesc = editUserDescTextarea.value.trim();

        // 更新页面显示
        if (newUsername) {
            usernameElement.textContent = newUsername;
        }
        if (newUserDesc) {
            userDescElement.textContent = newUserDesc;
        }

        // 更新头像
        if (avatarDisplay.style.backgroundImage) {
            avatarElement.style.backgroundImage = avatarDisplay.style.backgroundImage;
            avatarElement.textContent = '';
        } else if (avatarDisplay.textContent) {
            avatarElement.textContent = avatarDisplay.textContent;
            avatarElement.style.backgroundImage = '';
        }

        // 隐藏弹窗
        profileModal.classList.remove('active');
    });

    // 更换头像按钮点击事件
    changeAvatarBtn.addEventListener('click', function () {
        avatarInput.click();
    });

    // 头像显示区域点击事件
    avatarDisplay.addEventListener('click', function () {
        avatarInput.click();
    });

    // 头像文件选择事件
    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                avatarDisplay.style.backgroundImage = `url('${event.target.result}')`;
                avatarDisplay.textContent = '';
            };
            reader.readAsDataURL(file);
        }
    });

    // 点击遮罩层关闭弹窗
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', function () {
        profileModal.classList.remove('active');
    });

    // 我的收货地址
    const addressItem = document.getElementById('addressItem');
    addressItem.addEventListener('click', function (e) {
        e.preventDefault();
        alert('收货地址管理功能即将开放！');
        // 在实际应用中，这里会跳转到收货地址管理页面
    });

    // 所有菜单项的点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const menuText = this.querySelector('.menu-text').textContent;

            // 根据不同的菜单项显示不同的提示
            switch (menuText) {
                case '我的收藏':
                    alert('我的收藏功能即将开放！');
                    break;
                case '邀请好友':
                    alert('邀请好友功能即将开放！');
                    break;
                case '帮助中心':
                    alert('帮助中心功能即将开放！');
                    break;
                case '联系客服':
                    alert('客服热线：400-123-4567');
                    break;
                case '设置':
                    alert('设置功能即将开放！');
                    break;
                default:
                    alert(`${menuText}功能即将开放！`);
            }
        });
    });

    // 订单状态点击事件
    const orderStats = document.querySelectorAll('.order-stat');
    orderStats.forEach(stat => {
        stat.addEventListener('click', function () {
            const label = this.querySelector('.stat-label').textContent;
            alert(`查看${label}订单`);
            // 在实际应用中，这里会跳转到对应状态的订单列表
        });
    });

    // 模拟用户数据（在实际应用中应从后端获取）
    function loadUserData() {
        // 这里可以添加从服务器获取用户数据的代码
        console.log('加载用户数据...');
    }

    // 初始化加载用户数据
    loadUserData();
});