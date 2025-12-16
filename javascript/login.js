// DOM元素
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const toRegisterLink = document.getElementById('toRegisterLink');
const toLoginLink = document.getElementById('toLoginLink');
const forgotPasswordLink = document.getElementById('forgotPassword');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const backToLoginLink = document.getElementById('backToLoginLink');
const backBtn = document.getElementById('backBtn');
const pageTitle = document.getElementById('pageTitle');
const authContainer = document.getElementById('authContainer');
const successMessage = document.getElementById('successMessage');
const continueBtn = document.getElementById('continueBtn');

// 切换登录/注册表单
loginTab.addEventListener('click', () => switchAuthTab('login'));
registerTab.addEventListener('click', () => switchAuthTab('register'));
toRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchAuthTab('register');
});
toLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchAuthTab('login');
});

// 切换登录/注册标签
function switchAuthTab(tab) {
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        pageTitle.textContent = '登录美食商城';
    } else {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        pageTitle.textContent = '注册美食商城';
    }
}

// 忘记密码功能
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    authContainer.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
    pageTitle.textContent = '找回密码';
});

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordForm.style.display = 'none';
    authContainer.style.display = 'block';
    switchAuthTab('login');
});

// 返回按钮功能
backBtn.addEventListener('click', () => {
    if (forgotPasswordForm.style.display === 'block') {
        forgotPasswordForm.style.display = 'none';
        authContainer.style.display = 'block';
        switchAuthTab('login');
    } else if (successMessage.style.display === 'block') {
        // 如果当前在成功页面，返回到登录页面
        successMessage.style.display = 'none';
        authContainer.style.display = 'block';
        switchAuthTab('login');
    } else {
        // 在实际应用中，这里可以返回上一页或首页
        alert('返回商城首页');
        // 假设返回商城首页
        window.location.href = 'index.html'; // 这里需要替换为实际的主页URL
    }
});

// 密码显示/隐藏切换
function setupPasswordToggle(eyeBtnId, passwordFieldId) {
    const eyeBtn = document.getElementById(eyeBtnId);
    const passwordField = document.getElementById(passwordFieldId);

    eyeBtn.addEventListener('click', () => {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        eyeBtn.textContent = type === 'password' ? '👁️' : '🙈';
    });
}

// 设置所有密码显示/隐藏切换
setupPasswordToggle('toggleLoginPassword', 'loginPassword');
setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
setupPasswordToggle('toggleNewPassword', 'newPassword');

// 验证码发送功能
const sendCodeBtn = document.getElementById('sendCodeBtn');
const sendResetCodeBtn = document.getElementById('sendResetCodeBtn');

function startCountdown(button, seconds = 60) {
    let countdown = seconds;
    button.disabled = true;
    button.textContent = `${countdown}秒后重新发送`;

    const interval = setInterval(() => {
        countdown--;
        button.textContent = `${countdown}秒后重新发送`;

        if (countdown <= 0) {
            clearInterval(interval);
            button.disabled = false;
            button.textContent = '获取验证码';
        }
    }, 1000);
}

sendCodeBtn.addEventListener('click', () => {
    const phone = document.getElementById('registerPhone').value;
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入有效的手机号');
        return;
    }

    // 模拟发送验证码
    alert(`验证码已发送至 ${phone}，请注意查收`);
    startCountdown(sendCodeBtn);
});

sendResetCodeBtn.addEventListener('click', () => {
    const account = document.getElementById('resetAccount').value;
    if (!account) {
        alert('请输入手机号或邮箱');
        return;
    }

    // 模拟发送验证码
    alert(`验证码已发送至 ${account}，请注意查收`);
    startCountdown(sendResetCodeBtn);
});

// 表单提交处理
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const account = document.getElementById('loginAccount').value;
    const password = document.getElementById('loginPassword').value;

    // 简单验证
    if (!account || !password) {
        alert('请填写完整的登录信息');
        return;
    }

    // 模拟登录成功
    console.log('登录信息:', { account, password });

    // 显示成功消息
    authContainer.style.display = 'none';
    successMessage.style.display = 'block';
    pageTitle.textContent = '登录成功';

    // 在实际应用中，这里会发送登录请求到服务器
    // 然后根据响应结果处理
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('registerPhone').value;
    const code = document.getElementById('registerCode').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreement = document.getElementById('userAgreement').checked;

    // 验证
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入有效的手机号');
        return;
    }

    if (!code || code.length !== 6) {
        alert('请输入6位验证码');
        return;
    }

    if (!password || password.length < 6 || password.length > 20) {
        alert('密码长度应为6-20位字符');
        return;
    }

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }

    if (!agreement) {
        alert('请阅读并同意用户协议和隐私政策');
        return;
    }

    // 模拟注册成功
    console.log('注册信息:', { phone, code, password });

    alert('注册成功！请登录您的账号');
    switchAuthTab('login');

    // 在实际应用中，这里会发送注册请求到服务器
});

resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const account = document.getElementById('resetAccount').value;
    const code = document.getElementById('resetCode').value;
    const newPassword = document.getElementById('newPassword').value;

    // 简单验证
    if (!account || !code || !newPassword) {
        alert('请填写完整的信息');
        return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
        alert('密码长度应为6-20位字符');
        return;
    }

    // 模拟重置密码成功
    console.log('重置密码信息:', { account, code, newPassword });

    alert('密码重置成功！请使用新密码登录');
    forgotPasswordForm.style.display = 'none';
    authContainer.style.display = 'block';
    switchAuthTab('login');
});

// 社交登录
const wechatLogin = document.getElementById('wechatLogin');
const qqLogin = document.getElementById('qqLogin');
const wechatAuthModal = document.getElementById('wechatAuthModal');
const qqAuthModal = document.getElementById('qqAuthModal');

wechatLogin.addEventListener('click', () => {
    wechatAuthModal.style.display = 'flex';
});

qqLogin.addEventListener('click', () => {
    qqAuthModal.style.display = 'flex';
});

// 社交授权取消/确认
document.getElementById('wechatAuthCancel').addEventListener('click', () => {
    wechatAuthModal.style.display = 'none';
});

document.getElementById('wechatAuthConfirm').addEventListener('click', () => {
    wechatAuthModal.style.display = 'none';
    // 模拟微信登录成功
    authContainer.style.display = 'none';
    successMessage.style.display = 'block';
    pageTitle.textContent = '登录成功';
});

document.getElementById('qqAuthCancel').addEventListener('click', () => {
    qqAuthModal.style.display = 'none';
});

document.getElementById('qqAuthConfirm').addEventListener('click', () => {
    qqAuthModal.style.display = 'none';
    // 模拟QQ登录成功
    authContainer.style.display = 'none';
    successMessage.style.display = 'block';
    pageTitle.textContent = '登录成功';
});

// 继续购物按钮
continueBtn.addEventListener('click', () => {
    // 在实际应用中，这里会跳转到商城首页
    alert('跳转到商城首页');
    window.location.href = 'index.html'; // 这里需要替换为实际的主页URL
});

// 初始化
switchAuthTab('login');