# 🚀 基于 Cloudflare Workers 的 F-Droid 镜像

本项目提供一个轻量级的 Cloudflare Workers 脚本，只代理 `https://f-droid.org/repo/` 路径。所有仓库文件（索引、metadata、APK）都将在 Cloudflare 边缘节点缓存，大幅降低 Android 设备的更新和下载时间。非 `/repo/` 路径的请求将返回 **404**，避免意外代理其他资源。

---

## ✨ 特性  

- **🔒 仅代理 `/repo/`**：其它路径直接返回 404，确保只缓存仓库文件。  
- **⚡ 边缘缓存**：为索引文件、APK、metadata 设置合适的 `Cache‑Control`，让 Cloudflare CDN 加速。  
- **💸 免费额度足够**：在 Cloudflare 免费 Workers 计划（≤100 k 次请求/天）即可使用。  
- **🚀 部署简易**：单文件脚本，无需额外依赖。  

---

## 🛠 前置条件  

| 条件 | 说明 |
|------|------|
| 🌐 Cloudflare 账户 | 免费或付费账号，已开启 Workers 功能。 |
| 🌍 自定义域名（可选） | 已在 Cloudflare 中管理的域名。 |
---

## 📦 安装与部署  

1. **部署到 Cloudflare**  

   - 登录 Cloudflare → **Workers 和 Pages** → **创建应用程序** → **从Hello world！开始** → 为服务命名（如 `fdroid-repo-proxy`）。  
   - 将 `index.js` 内容粘贴到编辑器中，点击 **部署**。  

2. **绑定自定义域名（可选）**  

   - 在 Workers → **域和路由** 中添加自定义域 `f-droid.example.com/*`。  

---

## 📱 使用方法  

1. 在 Android 设备打开 **F‑Droid** → **设置** → **软件仓库** → **添加仓库**。  
2. 输入代理 URL（若使用自定义域名，请替换为你的域名）：  

   ```
   https://f-droid.example.com/repo/
   ```

3. 保存后手动执行 **更新**，客户端将从 Cloudflare 边缘节点下载索引和 APK，通常只需几秒钟即可完成。  
