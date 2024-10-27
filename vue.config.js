// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/<cart>/'  // 替換成你的 GitHub 儲存庫名稱
    : '/',
  outputDir: 'docs'  // 或使用 'dist'
}

// // package.json 部署腳本
// {
//   "scripts": {
//     "deploy": "npm run build && gh-pages -d docs"  // 如果 outputDir 是 dist，這裡改成 -d dist
//   },
//   "devDependencies": {
//     "gh-pages": "^6.1.0"
//   }
// }

// // 部署的 GitHub Action 工作流配置
// // .github/workflows/deploy.yml
// name: Deploy to GitHub Pages

// on:
//   push:
//     branches:
//       - main  # 或 master，視你的默認分支而定

// jobs:
//   deploy:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v3
      
//       - name: Setup Node.js
//         uses: actions/setup-node@v3
//         with:
//           node-version: '18'
          
//       - name: Install dependencies
//         run: npm install
        
//       - name: Build
//         run: npm run build
        
//       - name: Deploy to GitHub Pages
//         uses: peaceiris/actions-gh-pages@v3
//         with:
//           github_token: ${{ secrets.GITHUB_TOKEN }}
//           publish_dir: ./docs  # 如果 outputDir 是 dist，這裡改成 ./dist