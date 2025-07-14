<template>
  <div class="box-main">
    <div class="content">
      <div class="minimal-form">
        <div class="form-title">MobaXterm 许可生成</div>
        <div class="form-group">
          <label for="licenseType">版本</label>
          <select id="licenseType" v-model="licenseType">
            <option v-for="(val, key) in LICENSE_TYPES" :value="val">{{ key }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="userName">用户名</label>
          <input id="userName" v-model="userName" placeholder=" " type="text" />
        </div>
        <div class="form-group">
          <label for="versionName">版本号</label>
          <input id="versionName" v-model="versionName" placeholder=" " type="text" />
        </div>
        <div class="form-group">
          <label for="userNum">用户数</label>
          <input id="userNum" v-model="userNum" placeholder=" " type="number" />
        </div>
        <button class="submit-button" @click.stop="generate">生成</button>
        <p class="form-hint">提示: 将生成的 <code>Custom.mxtpro</code> 文件复制到 MobaXterm 安装目录。</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fileSave } from 'browser-fs-access';
import './lib/jszip.js';
import { LicenseType, generateLicense } from './lib/mobaXtermGenerater.js';

export default {
  data() {
    return {
      LICENSE_TYPES: LicenseType,
      licenseType: 1,
      userName: 'www_geekery_cn',
      versionName: '24.2',
      userNum: 1,
    };
  },
  methods: {
    generate() {
      if (!this.userName) {
        alert('请填写用户名');
        return;
      }
      if (!this.versionName) {
        alert('请填写版本号');
        return;
      }
      if (!this.userNum) this.userNum = 1;

      let versionNameArr = this.versionName.split('.');
      const majorVersion = parseInt(versionNameArr[0]);
      const minorVersion = versionNameArr.length === 2 ? (parseInt(versionNameArr[1]) || 0) : 0;

      let licenseStr = generateLicense(this.licenseType, this.userName, this.userNum, majorVersion, minorVersion);
      this.generateLicenseFile(licenseStr);
    },
    async generateLicenseFile(licenseStr) {
      const zip = new JSZip();
      zip.file("Pro.key", licenseStr);
      //var img = zip.folder("images");
      //img.file("smile.gif", imgData, { base64: true });
      const content = await zip.generateAsync({ type: "blob" });
      await fileSave(content, {
        fileName: 'Custom.mxtpro',
        extensions: ['.mxtpro'],
      });
    }
  }
};
</script>

<style scoped>
.minimal-form {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  --brand-color: #3eaf7c;
  --border-color: #e0e0e0;
  --text-color: #333;
  --label-color: #757575;
}

.form-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.form-group {
  position: relative;
}

.form-group label {
  color: var(--label-color);
  font-size: 1rem;
}

.form-group input,
.form-group select {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  padding: 0.5rem 0;
  background-color: transparent;
  font-size: 1rem;
  color: var(--text-color);
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-bottom-color: var(--brand-color);
}

.submit-button {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: var(--brand-color);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: #33a06f;
}

.form-hint {
  text-align: center;
  font-size: 0.8rem;
  color: #9e9e9e;
  margin-top: 0.5rem;
}

.form-hint code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  color: #555;
}
</style>