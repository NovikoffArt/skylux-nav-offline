'use strict';
(() => {
  const root = 'https://ociydhhalsrnrahvppzh.supabase.co';
  // Public client key, also used by the APK. No server credentials belong here.
  const key = 'sb_publishable_zREPGMuyxwkN3blPRxW4rg_ZETBfQh5';
  const words = {
    title: ['Видалення SkyLux ID', 'Удаление SkyLux ID', 'Delete SkyLux ID'],
    intro: ['Видаліть свій обліковий запис без встановлення застосунку. Потрібні підтверджена пошта та поточний пароль SkyLux ID.', 'Удалите свою учётную запись без установки приложения. Нужны подтверждённая почта и текущий пароль SkyLux ID.', 'Delete your account without installing the app. You need your confirmed email and current SkyLux ID password.'],
    impact: ['Дія незворотна. Сервер видалить SkyLux ID, профіль, аватари та пов’язані записи. Спочатку експортуйте потрібні дані в застосунку. Копії на інших пристроях можуть залишатися до оновлення; чужі знімки екрана видалити неможливо. Покупка Google Play та її відновлення окремі від SkyLux ID.', 'Действие необратимо. Сервер удалит SkyLux ID, профиль, аватары и связанные записи. Сначала экспортируйте нужные данные в приложении. Копии на других устройствах могут оставаться до обновления; чужие снимки экрана удалить невозможно. Покупка Google Play и её восстановление отделены от SkyLux ID.', 'This is permanent. The server deletes SkyLux ID, its profile, avatars and related records. Export any data you need in the app first. Copies on other devices may remain until refreshed; other people’s screenshots cannot be removed. Google Play purchases and restoration are separate from SkyLux ID.'],
    email: ['Пошта SkyLux ID', 'Почта SkyLux ID', 'SkyLux ID email'],
    password: ['Поточний пароль SkyLux ID', 'Текущий пароль SkyLux ID', 'Current SkyLux ID password'],
    confirm: ['Розумію наслідки та хочу назавжди видалити свій SkyLux ID.', 'Понимаю последствия и хочу навсегда удалить свой SkyLux ID.', 'I understand the consequences and want to permanently delete my SkyLux ID.'],
    submit: ['Назавжди видалити SkyLux ID', 'Навсегда удалить SkyLux ID', 'Permanently delete SkyLux ID'],
    privacy: ['Дані входу передаються лише серверу SkyLux у Supabase через HTTPS. Ця сторінка не зберігає пароль або сесію в браузері, не використовує аналітику й не надсилає дані до GitHub. Сторінку розміщено на GitHub Pages.', 'Данные входа передаются только серверу SkyLux в Supabase через HTTPS. Эта страница не сохраняет пароль или сессию в браузере, не использует аналитику и не отправляет данные в GitHub. Страница размещена на GitHub Pages.', 'Credentials are sent only to the SkyLux server on Supabase over HTTPS. This page does not save your password or session in browser storage, use analytics or send your form data to GitHub. GitHub Pages hosts this page.'],
    recovery: ['Якщо забули пароль, скористайтеся відновленням у SkyLux ID в застосунку. Нікому не надсилайте пароль або код підтвердження.', 'Если забыли пароль, используйте восстановление в SkyLux ID в приложении. Никому не отправляйте пароль или код подтверждения.', 'If you forgot your password, use password recovery in SkyLux ID in the app. Never send anyone your password or verification code.'],
    working: ['Перевіряємо власника та виконуємо запит…', 'Проверяем владельца и выполняем запрос…', 'Verifying account ownership and processing your request…'],
    success: ['Сервер підтвердив видалення SkyLux ID.', 'Сервер подтвердил удаление SkyLux ID.', 'The server confirmed that SkyLux ID was deleted.'],
    signin: ['Не вдалося підтвердити вхід. Перевірте пошту, пароль і підтвердження пошти.', 'Не удалось подтвердить вход. Проверьте почту, пароль и подтверждение почты.', 'Sign-in could not be confirmed. Check your email, password and email confirmation.'],
    confirmation: ['Підтвердіть наслідки видалення та заповніть пошту й пароль.', 'Подтвердите последствия удаления и заполните почту и пароль.', 'Acknowledge permanent deletion and enter your email and password.'],
    rate: ['Забагато запитів. Зачекайте й повторіть спробу.', 'Слишком много запросов. Подождите и повторите попытку.', 'Too many requests. Wait before trying again.'],
    unknown: ['Результат не підтверджено. Перевірте вхід у SkyLux ID. Не вважайте дані видаленими без підтвердження сервера.', 'Результат не подтверждён. Проверьте вход в SkyLux ID. Не считайте данные удалёнными без подтверждения сервера.', 'The result could not be confirmed. Check sign-in to SkyLux ID. Do not assume data was deleted without server confirmation.'],
  };
  class Failure extends Error { constructor(code) { super(code); this.code = code; } }
  async function jsonRequest(path, token, body, timeout, transport) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await transport(root + path, {
        method: 'POST', credentials: 'omit', cache: 'no-store', redirect: 'error',
        referrerPolicy: 'no-referrer', signal: controller.signal,
        headers: {apikey: key, 'Content-Type': 'application/json', ...(token ? {Authorization: 'Bearer ' + token} : {})},
        body: body === null ? undefined : JSON.stringify(body),
      });
      const data = await response.json().catch(() => null);
      return {status: response.status, data};
    } finally { clearTimeout(timer); }
  }
  async function deleteAccount(email, password, confirmed, transport = globalThis.fetch) {
    if (confirmed !== true || typeof email !== 'string' || email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== 'string' ||
        password.length < 1 || password.length > 4096) throw new Failure('confirmation');
    let token = null;
    let deleted = false;
    try {
      const login = await jsonRequest('/auth/v1/token?grant_type=password', null, {email, password}, 20000, transport);
      if (login.status === 429) throw new Failure('rate');
      if (login.status !== 200 || typeof login.data?.access_token !== 'string' ||
          !login.data.access_token || login.data.access_token.length > 8192) throw new Failure('signin');
      token = login.data.access_token;
      const result = await jsonRequest('/functions/v1/delete-account', token, {password}, 45000, transport);
      if (result.status === 429) throw new Failure('rate');
      if (result.status !== 200 || result.data?.deleted !== true) throw new Failure('unknown');
      deleted = true;
      return true;
    } catch (error) { throw error instanceof Failure ? error : new Failure('unknown'); }
    finally {
      if (token && !deleted) {
        try { await jsonRequest('/auth/v1/logout?scope=local', token, null, 5000, transport); } catch (_) { /* No session is persisted locally. */ }
      }
      token = null;
      password = '';
    }
  }
  if (typeof module === 'object' && module.exports) { module.exports = {deleteAccount, words}; return; }
  const form = document.getElementById('deletion-form');
  const language = document.getElementById('language');
  const status = document.getElementById('status');
  let busy = false, finished = false;
  let statusKey = '';
  language.value = navigator.language.startsWith('ru') ? 'ru' : navigator.language.startsWith('en') ? 'en' : 'uk';
  function render() {
    const i = {uk: 0, ru: 1, en: 2}[language.value] ?? 0;
    document.documentElement.lang = language.value;
    for (const element of document.querySelectorAll('[data-text]')) element.textContent = words[element.dataset.text][i];
    document.title = words.title[i] + ' · SkyLux NAV';
    status.textContent = statusKey ? words[statusKey][i] : '';
  }
  language.addEventListener('change', render);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || finished || !form.reportValidity()) return;
    if (window.top !== window.self || location.protocol !== 'https:') { statusKey = 'unknown'; render(); return; }
    busy = true;
    statusKey = 'working';
    for (const input of form.elements) input.disabled = true;
    language.disabled = true;
    render();
    try {
      await deleteAccount(document.getElementById('email').value.trim(), document.getElementById('password').value,
        document.getElementById('confirm').checked);
      finished = true;
      statusKey = 'success';
    } catch (error) { statusKey = words[error.code] ? error.code : 'unknown'; }
    finally {
      form.reset();
      busy = false;
      for (const input of form.elements) input.disabled = finished;
      language.disabled = false;
      render();
      status.focus();
    }
  });
  window.addEventListener('pagehide', () => form.reset());
  render();
})();
