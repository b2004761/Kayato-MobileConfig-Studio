(function () {
  "use strict";

  var sampleUrl = "sample.mobileconfig";
  var sampleProfile = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"',
    '   "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '<dict>',
    '  <key>PayloadContent</key>',
    '  <array>',
    '    <dict>',
    '      <key>PayloadType</key>',
    '      <string>com.apple.webClip.managed</string>',
    '      <key>PayloadVersion</key>',
    '      <integer>1</integer>',
    '      <key>PayloadIdentifier</key>',
    '      <string>org.js.mobileconfiginstaller.webclip</string>',
    '      <key>PayloadUUID</key>',
    '      <string>9E4D64F5-ABCD-1234-ABCD-9876543210AA</string>',
    '      <key>PayloadDisplayName</key>',
    '      <string>Test Shortcut</string>',
    '      <key>Label</key>',
    '      <string>Open Test</string>',
    '      <key>FullScreen</key>',
    '      <true/>',
    '      <key>IsRemovable</key>',
    '      <true/>',
    '      <key>Precomposed</key>',
    '      <true/>',
    '      <key>URL</key>',
    '      <string>https://mobile-config-installer.js.org</string>',
    '    </dict>',
    '  </array>',
    '',
    '  <key>PayloadDisplayName</key>',
    '  <string>Kayato Test Profile</string>',
    '  <key>PayloadIdentifier</key>',
    '  <string>org.kayato.mobileconfig</string>',
    '  <key>PayloadRemovalDisallowed</key>',
    '  <false/>',
    '  <key>PayloadType</key>',
    '  <string>Configuration</string>',
    '  <key>PayloadUUID</key>',
    '  <string>11111111-2222-3333-4444-555555555555</string>',
    '  <key>PayloadVersion</key>',
    '  <integer>1</integer>',
    '</dict>',
    '</plist>',
    ''
  ].join("\n");
  var cachedKayatoIdentity = null;
  var maxInputSize = 2 * 1024 * 1024;
  var currentLang = "en";
  var i18n = {
    en: {
      brand: "Kayato MobileConfig Studio",
      heroTitle: "Create, sign and inspect iOS configuration profiles.",
      heroLead: "A local-first studio for .mobileconfig files. Generate common payloads, sign CMS/PKCS#7 profiles, extract signed content and prepare files for Safari installation.",
      tabInstall: "Install",
      tabGenerate: "Generate",
      tabSign: "Sign",
      tabUnsign: "Unsign",
      installTitle: "Prepare an installable profile",
      installLead: "Use a local file, a direct HTTPS URL or pasted XML/Plist content.",
      sourceFile: "Local file",
      sourceUrl: "Direct URL",
      sourceXml: "XML/Plist",
      localFileLabel: "Profile file",
      urlLabel: "Profile URL",
      urlPlaceholder: "https://example.com/profile.mobileconfig",
      xmlLabel: "XML/Plist content",
      installButton: "Create install file",
      sampleUrlButton: "Use sample URL",
      sampleXmlButton: "Insert sample XML",
      generateTitle: "Generate a profile",
      generateLead: "Build common mobileconfig payloads without any external repository files.",
      payloadTypeLabel: "Payload type",
      profileNameLabel: "Profile name",
      descriptionLabel: "Description",
      securityLabel: "Security",
      noPasswordOption: "No password",
      wifiSsidPlaceholder: "Network name",
      wifiPasswordLabel: "Wi-Fi password",
      optionalPassword: "Leave blank if there is no password",
      accountNameLabel: "Account name",
      signGeneratedLabel: "Automatically sign with Kayato after generating",
      generateButton: "Generate profile",
      signTitle: "Sign a .mobileconfig profile",
      signLead: "Default mode only needs a profile file. The automatic signer appears as Kayato.",
      unsignedProfileLabel: "Unsigned profile",
      signAuto: "Sign with Kayato self-signed identity",
      signP12: "Use P12/PFX",
      signPem: "Use certificate PEM + private key PEM",
      autoNote: "Kayato mode needs no extra key or certificate. iOS may show Not Verified because the certificate is self-signed.",
      p12FileLabel: "P12 or PFX file",
      p12PasswordLabel: "Password",
      signButton: "Sign and download profile",
      unsignTitle: "Unsign a signed profile",
      unsignLead: "Extract XML content from a CMS/PKCS#7 signed mobileconfig file so it can be inspected, edited or signed again.",
      signedProfileLabel: "Signed profile",
      unsignButton: "Unsign and download XML",
      footer: "Kayato MobileConfig Studio runs as a static local-first web app.",
      modalTitle: "Safari recommended",
      modalCopy: "iOS requires Safari to open the configuration profile installation screen. Open this page in Safari on iPhone or iPad.",
      modalButton: "Got it",
      themeDark: "Switch to dark mode",
      themeLight: "Switch to light mode",
      fileTooLarge: "The file is too large. The current limit is 2 MB to avoid freezing older browsers.",
      readError: "Could not read the file.",
      invalidUrl: "Invalid URL.",
      unsafeUrl: "Only HTTPS or localhost URLs are allowed.",
      forgeMissing: "The signing library is not loaded yet. Check forge.min.js and try again.",
      enterWifi: "Enter the Wi-Fi SSID.",
      enterMail: "Enter email, IMAP host and SMTP host.",
      enterDav: "Enter DAV host and username.",
      p12Missing: "P12/PFX is missing a certificate or private key.",
      pemMissing: "Enter the certificate PEM and private key PEM.",
      chooseP12: "Choose a P12/PFX file.",
      noCmsContent: "Could not find content inside the signed CMS file.",
      pasteXml: "Paste XML/Plist content.",
      enterUrl: "Enter a URL.",
      fetchFailed: "Could not fetch the URL. Check the link and CORS.",
      chooseProfile: "Choose a profile file.",
      installReady: "Install file created.",
      fetchedReady: "Profile fetched and install file created.",
      generating: "Generating...",
      signing: "Signing...",
      creatingSigner: "Creating Kayato signer...",
      generated: "Profile generated.",
      generatedSigned: "Profile generated and signed with Kayato.",
      signFailed: "Could not sign the profile.",
      chooseUnsigned: "Choose an unsigned profile.",
      signedReady: "Signed profile created.",
      chooseSigned: "Choose a signed profile.",
      unsigning: "Unsigning...",
      unsignedReady: "Signed profile content extracted.",
      unsignFailed: "Could not unsign this file. It may not be a CMS signed profile.",
      sampleInserted: "Sample XML inserted.",
      sampleFailed: "Could not fetch the sample XML.",
      exporting: "Exporting..."
    },
    vi: {
      brand: "Kayato MobileConfig Studio",
      heroTitle: "Tạo, ký và kiểm tra cấu hình iOS.",
      heroLead: "Studio xử lý local cho file .mobileconfig. Tạo payload thông dụng, ký CMS/PKCS#7, tách nội dung signed và chuẩn bị file để cài bằng Safari.",
      tabInstall: "Cài đặt",
      tabGenerate: "Tạo profile",
      tabSign: "Ký",
      tabUnsign: "Unsign",
      installTitle: "Chuẩn bị profile có thể cài đặt",
      installLead: "Dùng file local, URL HTTPS trực tiếp hoặc nội dung XML/Plist đã dán.",
      sourceFile: "File local",
      sourceUrl: "URL trực tiếp",
      sourceXml: "XML/Plist",
      localFileLabel: "File profile",
      urlLabel: "URL profile",
      urlPlaceholder: "https://example.com/profile.mobileconfig",
      xmlLabel: "Nội dung XML/Plist",
      installButton: "Tạo file cài đặt",
      sampleUrlButton: "Dùng URL mẫu",
      sampleXmlButton: "Chèn XML mẫu",
      generateTitle: "Tạo profile",
      generateLead: "Tạo các payload mobileconfig thông dụng mà không cần file từ repo ngoài.",
      payloadTypeLabel: "Loại payload",
      profileNameLabel: "Tên profile",
      descriptionLabel: "Mô tả",
      securityLabel: "Bảo mật",
      noPasswordOption: "Không mật khẩu",
      wifiSsidPlaceholder: "Tên mạng",
      wifiPasswordLabel: "Mật khẩu Wi-Fi",
      optionalPassword: "Để trống nếu không có mật khẩu",
      accountNameLabel: "Tên tài khoản",
      signGeneratedLabel: "Tự động ký bằng Kayato sau khi tạo",
      generateButton: "Tạo profile",
      signTitle: "Ký profile .mobileconfig",
      signLead: "Chế độ mặc định chỉ cần chọn file profile. Signer tự động sẽ hiện là Kayato.",
      unsignedProfileLabel: "Profile chưa ký",
      signAuto: "Ký bằng danh tính Kayato self-signed",
      signP12: "Dùng P12/PFX",
      signPem: "Dùng certificate PEM + private key PEM",
      autoNote: "Chế độ Kayato không cần key/cert thêm. iOS có thể hiện Not Verified vì certificate là self-signed.",
      p12FileLabel: "File P12 hoặc PFX",
      p12PasswordLabel: "Mật khẩu",
      signButton: "Ký và tải profile",
      unsignTitle: "Unsign profile đã ký",
      unsignLead: "Tách nội dung XML từ file mobileconfig signed CMS/PKCS#7 để xem, sửa hoặc ký lại.",
      signedProfileLabel: "Profile đã ký",
      unsignButton: "Unsign và tải XML",
      footer: "Kayato MobileConfig Studio chạy như web tĩnh ưu tiên xử lý local.",
      modalTitle: "Nên dùng Safari",
      modalCopy: "iOS yêu cầu Safari để mở màn hình cài configuration profile. Hãy mở trang này bằng Safari trên iPhone hoặc iPad.",
      modalButton: "Đã hiểu",
      themeDark: "Chuyển sang chế độ tối",
      themeLight: "Chuyển sang chế độ sáng",
      fileTooLarge: "File quá lớn. Giới hạn hiện tại là 2 MB để tránh treo trình duyệt cũ.",
      readError: "Không đọc được file.",
      invalidUrl: "URL không hợp lệ.",
      unsafeUrl: "Chỉ cho phép URL HTTPS hoặc localhost.",
      forgeMissing: "Thư viện ký chưa tải xong. Kiểm tra forge.min.js rồi thử lại.",
      enterWifi: "Hãy nhập Wi-Fi SSID.",
      enterMail: "Hãy nhập email, IMAP host và SMTP host.",
      enterDav: "Hãy nhập DAV host và username.",
      p12Missing: "P12/PFX thiếu certificate hoặc private key.",
      pemMissing: "Hãy nhập certificate PEM và private key PEM.",
      chooseP12: "Hãy chọn file P12/PFX.",
      noCmsContent: "Không tìm thấy nội dung bên trong signed CMS.",
      pasteXml: "Hãy dán nội dung XML/Plist.",
      enterUrl: "Hãy nhập URL.",
      fetchFailed: "Không tải được URL. Kiểm tra link và CORS.",
      chooseProfile: "Hãy chọn file profile.",
      installReady: "Đã tạo file cài đặt.",
      fetchedReady: "Đã tải profile và tạo file cài đặt.",
      generating: "Đang tạo...",
      signing: "Đang ký...",
      creatingSigner: "Đang tạo signer Kayato...",
      generated: "Đã tạo profile.",
      generatedSigned: "Đã tạo và ký profile bằng Kayato.",
      signFailed: "Không ký được profile.",
      chooseUnsigned: "Hãy chọn profile chưa ký.",
      signedReady: "Đã tạo signed profile.",
      chooseSigned: "Hãy chọn signed profile.",
      unsigning: "Đang unsign...",
      unsignedReady: "Đã tách nội dung signed profile.",
      unsignFailed: "Không unsign được. File có thể không phải CMS signed profile.",
      sampleInserted: "Đã chèn XML mẫu.",
      sampleFailed: "Không lấy được XML mẫu.",
      exporting: "Đang xuất file..."
    }
  };

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || i18n.en[key] || key;
  }

  function get(id) {
    return document.getElementById(id);
  }

  function hasClass(el, name) {
    return (" " + el.className + " ").indexOf(" " + name + " ") > -1;
  }

  function addClass(el, name) {
    if (!hasClass(el, name)) {
      el.className += (el.className ? " " : "") + name;
    }
  }

  function removeClass(el, name) {
    el.className = (" " + el.className + " ").replace(" " + name + " ", " ").replace(/^\s+|\s+$/g, "");
  }

  function toggle(el, visible) {
    if (!el) return;
    if (visible) removeClass(el, "hidden");
    else addClass(el, "hidden");
  }

  function each(list, fn) {
    for (var i = 0; i < list.length; i += 1) fn(list[i], i);
  }

  function toast(message, type) {
    var container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    var node = document.createElement("div");
    var close = document.createElement("button");
    var text = document.createElement("div");
    node.className = "toast " + (type || "info");
    close.type = "button";
    close.setAttribute("aria-label", "Dong");
    close.appendChild(document.createTextNode("\u00d7"));
    text.textContent = message;
    close.onclick = function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    };
    node.appendChild(close);
    node.appendChild(text);
    container.appendChild(node);
    window.setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    }, 4200);
  }

  function success(message) {
    toast(message, "success");
  }

  function fail(message) {
    toast(message, "error");
  }

  function applyLanguage(lang) {
    var textNodes;
    var placeholderNodes;
    currentLang = i18n[lang] ? lang : "en";
    document.documentElement.lang = currentLang;
    textNodes = document.querySelectorAll("[data-i18n]");
    placeholderNodes = document.querySelectorAll("[data-i18n-placeholder]");
    each(textNodes, function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    each(placeholderNodes, function (node) {
      node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
    });
    if (get("languageSelect")) get("languageSelect").value = currentLang;
    updateThemeLabel();
  }

  function updateThemeLabel() {
    var button = get("themeToggle");
    if (!button) return;
    if (document.body.className.indexOf("dark") > -1) {
      button.textContent = "☀";
      button.setAttribute("aria-label", t("themeLight"));
      button.setAttribute("title", t("themeLight"));
    } else {
      button.textContent = "☾";
      button.setAttribute("aria-label", t("themeDark"));
      button.setAttribute("title", t("themeDark"));
    }
  }

  function applyTheme(mode) {
    if (mode === "dark") addClass(document.body, "dark");
    else removeClass(document.body, "dark");
    updateThemeLabel();
  }

  function initialTheme() {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  function setBusy(button, text) {
    button.setAttribute("data-original-text", button.textContent);
    button.disabled = true;
    button.textContent = text;
  }

  function clearBusy(button) {
    button.disabled = false;
    button.textContent = button.getAttribute("data-original-text") || button.textContent;
    button.removeAttribute("data-original-text");
  }

  function readFileAsArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      if (file.size > maxInputSize) {
        reject(new Error(t("fileTooLarge")));
        return;
      }
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error || new Error(t("readError")));
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function arrayBufferToBinary(buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = "";
    var chunk = 8192;
    var i;

    for (i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }

    return binary;
  }

  function binaryToUint8Array(binary) {
    var out = new Uint8Array(binary.length);
    var i;
    for (i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
    return out;
  }

  function textToUtf8Binary(text) {
    return forge.util.encodeUtf8(text || "");
  }

  function downloadBlob(blob, filename) {
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function downloadProfileFromBinary(binary, filename) {
    downloadBlob(new Blob([binaryToUint8Array(binary)], { type: "application/x-apple-aspen-config" }), filename);
  }

  function downloadProfileFromText(text, filename) {
    downloadBlob(new Blob([text], { type: "application/x-apple-aspen-config;charset=utf-8" }), filename);
  }

  function fetchText(url) {
    var parsed;
    try {
      parsed = new URL(url, window.location.href);
    } catch (err) {
      return Promise.reject(new Error(t("invalidUrl")));
    }

    if (parsed.protocol !== "https:" && parsed.hostname !== "127.0.0.1" && parsed.hostname !== "localhost") {
      return Promise.reject(new Error(t("unsafeUrl")));
    }

    if (window.fetch) {
      return window.fetch(url, { cache: "no-store" }).then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      });
    }

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.responseText);
        else reject(new Error("HTTP " + xhr.status));
      };
      xhr.onerror = function () {
        reject(new Error("Network error"));
      };
      xhr.send();
    });
  }

  function uuid() {
    var d = new Date().getTime();
    var perf = window.performance && window.performance.now ? window.performance.now() : 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (perf + r) % 16 | 0;
        perf = Math.floor(perf / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }).toUpperCase();
  }

  function xmlEscape(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function plistValue(value, level) {
    var indent = new Array(level + 1).join("  ");
    var childIndent = new Array(level + 2).join("  ");
    var out = "";
    var key;
    var i;

    if (value instanceof Array) {
      out += indent + "<array>\n";
      for (i = 0; i < value.length; i += 1) out += plistValue(value[i], level + 1);
      out += indent + "</array>\n";
      return out;
    }

    if (value && typeof value === "object") {
      out += indent + "<dict>\n";
      for (key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key) && value[key] !== undefined && value[key] !== null && value[key] !== false) {
          out += childIndent + "<key>" + xmlEscape(key) + "</key>\n";
          out += plistValue(value[key], level + 1);
        }
      }
      out += indent + "</dict>\n";
      return out;
    }

    if (typeof value === "boolean") return indent + (value ? "<true/>\n" : "<false/>\n");
    if (typeof value === "number") return indent + "<integer>" + value + "</integer>\n";
    return indent + "<string>" + xmlEscape(value) + "</string>\n";
  }

  function buildPlist(data) {
    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
      '<plist version="1.0">',
      plistValue(data, 0).replace(/\s+$/, ""),
      "</plist>",
      ""
    ].join("\n");
  }

  function commonProfile(payloads) {
    return {
      PayloadContent: payloads,
      PayloadDescription: get("profileDescription").value || "Generated by Kayato",
      PayloadDisplayName: get("profileName").value || "Kayato Profile",
      PayloadIdentifier: get("profileIdentifier").value || "com.kayato.profile",
      PayloadOrganization: "Kayato",
      PayloadRemovalDisallowed: false,
      PayloadType: "Configuration",
      PayloadUUID: uuid(),
      PayloadVersion: 1
    };
  }

  function buildWifiPayload() {
    var encryption = get("wifiEncryption").value;
    var ssid = get("wifiSsid").value;
    if (!ssid) throw new Error(t("enterWifi"));

    return {
      AutoJoin: true,
      EncryptionType: encryption,
      HIDDEN_NETWORK: false,
      IsHotspot: false,
      Password: encryption === "None" ? undefined : get("wifiPassword").value,
      PayloadDescription: "Configures Wi-Fi settings",
      PayloadDisplayName: ssid,
      PayloadIdentifier: (get("profileIdentifier").value || "com.kayato.profile") + ".wifi",
      PayloadOrganization: "Kayato",
      PayloadType: "com.apple.wifi.managed",
      PayloadUUID: uuid(),
      PayloadVersion: 1,
      ProxyType: "None",
      SSID_STR: ssid
    };
  }

  function buildMailPayload() {
    var email = get("mailAddress").value;
    var imapHost = get("imapHost").value;
    var smtpHost = get("smtpHost").value;
    if (!email || !imapHost || !smtpHost) throw new Error(t("enterMail"));

    return {
      EmailAccountDescription: get("mailName").value || email,
      EmailAccountName: get("mailName").value || email,
      EmailAccountType: "EmailTypeIMAP",
      EmailAddress: email,
      IncomingMailServerAuthentication: "EmailAuthPassword",
      IncomingMailServerHostName: imapHost,
      IncomingMailServerPortNumber: Number(get("imapPort").value || 993),
      IncomingMailServerUseSSL: Number(get("imapPort").value || 993) === 993,
      IncomingMailServerUsername: get("mailUser").value || email,
      IncomingPassword: get("mailPassword").value,
      OutgoingMailServerAuthentication: "EmailAuthPassword",
      OutgoingMailServerHostName: smtpHost,
      OutgoingMailServerPortNumber: Number(get("smtpPort").value || 587),
      OutgoingMailServerUseSSL: Number(get("smtpPort").value || 587) === 465,
      OutgoingMailServerUsername: get("mailUser").value || email,
      OutgoingPasswordSameAsIncomingPassword: true,
      PayloadDescription: "Configures mail account",
      PayloadDisplayName: get("mailName").value || "Mail Account",
      PayloadIdentifier: (get("profileIdentifier").value || "com.kayato.profile") + ".mail",
      PayloadOrganization: "Kayato",
      PayloadType: "com.apple.mail.managed",
      PayloadUUID: uuid(),
      PayloadVersion: 1,
      PreventAppSheet: false,
      PreventMove: false,
      SMIMEEnabled: false,
      allowMailDrop: true
    };
  }

  function buildDavPayload(type) {
    var isCard = type === "carddav";
    var host = get("davHost").value;
    var user = get("davUser").value;
    if (!host || !user) throw new Error(t("enterDav"));

    var base = {
      PayloadDescription: isCard ? "Configures contacts account" : "Configures calendar account",
      PayloadDisplayName: user + (isCard ? " contacts" : " calendar"),
      PayloadIdentifier: (get("profileIdentifier").value || "com.kayato.profile") + "." + type,
      PayloadOrganization: "Kayato",
      PayloadType: isCard ? "com.apple.carddav.account" : "com.apple.caldav.account",
      PayloadUUID: uuid(),
      PayloadVersion: 1
    };

    if (isCard) {
      base.CardDAVAccountDescription = user + " contacts";
      base.CardDAVHostName = host;
      base.CardDAVPort = Number(get("davPort").value || 443);
      base.CardDAVPrincipalURL = get("davPrincipal").value;
      base.CardDAVUseSSL = Number(get("davPort").value || 443) === 443;
      base.CardDAVUsername = user;
      base.CardDAVPassword = get("davPassword").value;
    } else {
      base.CalDAVAccountDescription = user + " calendar";
      base.CalDAVHostName = host;
      base.CalDAVPort = Number(get("davPort").value || 443);
      base.CalDAVPrincipalURL = get("davPrincipal").value;
      base.CalDAVUseSSL = Number(get("davPort").value || 443) === 443;
      base.CalDAVUsername = user;
      base.CalDAVPassword = get("davPassword").value;
    }

    return base;
  }

  function buildGeneratedProfile() {
    var type = get("profileType").value;
    if (type === "wifi") return buildPlist(commonProfile([buildWifiPayload()]));
    if (type === "mail") return buildPlist(commonProfile([buildMailPayload()]));
    return buildPlist(commonProfile([buildDavPayload(type)]));
  }

  function clearValue(id) {
    var field = get(id);
    if (field) field.value = "";
  }

  function clearSensitiveProfileFields() {
    clearValue("wifiPassword");
    clearValue("mailPassword");
    clearValue("davPassword");
  }

  function clearSensitiveSigningFields() {
    clearValue("unsignedProfile");
    clearValue("p12File");
    clearValue("p12Password");
    clearValue("certPem");
    clearValue("keyPem");
  }

  function ensureForge() {
    if (!window.forge) throw new Error(t("forgeMissing"));
  }

  function createKayatoIdentity() {
    var now;
    var after;
    var keys;
    var cert;

    ensureForge();
    if (cachedKayatoIdentity) return cachedKayatoIdentity;

    keys = forge.pki.rsa.generateKeyPair({ bits: 2048, workers: -1 });
    cert = forge.pki.createCertificate();
    now = new Date();
    after = new Date(now.getTime());
    after.setFullYear(after.getFullYear() + 5);

    cert.publicKey = keys.publicKey;
    cert.serialNumber = String(now.getTime());
    cert.validity.notBefore = now;
    cert.validity.notAfter = after;
    cert.setSubject([
      { name: "commonName", value: "Kayato" },
      { name: "organizationName", value: "Kayato" }
    ]);
    cert.setIssuer(cert.subject.attributes);
    cert.setExtensions([
      { name: "basicConstraints", cA: true },
      { name: "keyUsage", digitalSignature: true, keyCertSign: true },
      { name: "extKeyUsage", codeSigning: true },
      { name: "subjectKeyIdentifier" }
    ]);
    cert.sign(keys.privateKey, forge.md.sha256.create());

    cachedKayatoIdentity = { certificate: cert, key: keys.privateKey, chain: [cert] };
    return cachedKayatoIdentity;
  }

  function p12Identity(file, password) {
    return readFileAsArrayBuffer(file).then(function (buffer) {
      var p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(arrayBufferToBinary(buffer)), false, password || "");
      var shrouded = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag] || [];
      var keyBags = p12.getBags({ bagType: forge.pki.oids.keyBag })[forge.pki.oids.keyBag] || [];
      var certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag] || [];
      var key = (shrouded[0] && shrouded[0].key) || (keyBags[0] && keyBags[0].key);
      var cert = certBags[0] && certBags[0].cert;
      var chain = [];
      var i;

      if (!key || !cert) throw new Error(t("p12Missing"));
      for (i = 0; i < certBags.length; i += 1) {
        if (certBags[i].cert) chain.push(certBags[i].cert);
      }
      return { certificate: cert, key: key, chain: chain };
    });
  }

  function pemIdentity() {
    var certPem = get("certPem").value;
    var keyPem = get("keyPem").value;
    if (!certPem || !keyPem) throw new Error(t("pemMissing"));
    return {
      certificate: forge.pki.certificateFromPem(certPem),
      key: forge.pki.privateKeyFromPem(keyPem),
      chain: [forge.pki.certificateFromPem(certPem)]
    };
  }

  function selectedSigningMode() {
    var selected = document.querySelector("input[name='signMode']:checked");
    return selected ? selected.value : "auto";
  }

  function getSigningIdentity() {
    ensureForge();
    if (selectedSigningMode() === "auto") return Promise.resolve(createKayatoIdentity());
    if (selectedSigningMode() === "pem") return Promise.resolve(pemIdentity());
    if (!get("p12File").files[0]) return Promise.reject(new Error(t("chooseP12")));
    return p12Identity(get("p12File").files[0], get("p12Password").value);
  }

  function signBinary(contentBinary, identity) {
    var p7 = forge.pkcs7.createSignedData();
    var chain = identity.chain && identity.chain.length ? identity.chain : [identity.certificate];
    var i;

    p7.content = forge.util.createBuffer(contentBinary, "binary");
    for (i = 0; i < chain.length; i += 1) p7.addCertificate(chain[i]);
    p7.addSigner({
      key: identity.key,
      certificate: identity.certificate,
      digestAlgorithm: forge.pki.oids.sha256,
      authenticatedAttributes: [
        { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
        { type: forge.pki.oids.messageDigest },
        { type: forge.pki.oids.signingTime, value: new Date() }
      ]
    });
    p7.sign({ detached: false });
    return forge.asn1.toDer(p7.toAsn1()).getBytes();
  }

  function signText(text, identity) {
    return signBinary(textToUtf8Binary(text), identity);
  }

  function extractSignedContent(binary) {
    var asn1 = forge.asn1.fromDer(binary);
    var p7 = forge.pkcs7.messageFromAsn1(asn1);
    var content;

    if (p7.content && typeof p7.content.getBytes === "function") return p7.content.getBytes();
    if (p7.rawCapture && p7.rawCapture.content) {
      content = p7.rawCapture.content;
      if (typeof content === "string") return content;
      if (content.value && content.value.length) {
        if (typeof content.value[0] === "string") return content.value[0];
        if (content.value[0] && typeof content.value[0].value === "string") return content.value[0].value;
      }
    }

    throw new Error(t("noCmsContent"));
  }

  function processInstall() {
    var source = document.querySelector("input[name='installSource']:checked").value;
    var file;

    if (source === "xml") {
      if (!get("xmlCode").value) return fail(t("pasteXml"));
      downloadProfileFromText(get("xmlCode").value, "pasted-profile.mobileconfig");
      clearValue("xmlCode");
      return success(t("installReady"));
    }

    if (source === "url") {
      if (!get("fileUrl").value) return fail(t("enterUrl"));
      return fetchText(get("fileUrl").value).then(function (text) {
        downloadProfileFromText(text, "url-profile.mobileconfig");
        clearValue("fileUrl");
        success(t("fetchedReady"));
      }).catch(function () {
        fail(t("fetchFailed"));
      });
    }

    file = get("localFile").files[0];
    if (!file) return fail(t("chooseProfile"));
    readFileAsArrayBuffer(file).then(function (buffer) {
      downloadProfileFromBinary(arrayBufferToBinary(buffer), file.name || "profile.mobileconfig");
      clearValue("localFile");
      success(t("installReady"));
    }).catch(function (err) {
      fail(err.message || "Khong doc duoc tep.");
    });
  }

  function processGenerate() {
    var button = get("generateProfile");
    var plist;
    setBusy(button, t("generating"));
    try {
      plist = buildGeneratedProfile();
    } catch (err) {
      clearBusy(button);
      fail(err.message);
      return;
    }

    if (!get("signGenerated").checked) {
      downloadProfileFromText(plist, "kayato-generated.mobileconfig");
      clearSensitiveProfileFields();
      clearBusy(button);
      success(t("generated"));
      return;
    }

    button.textContent = cachedKayatoIdentity ? t("signing") : t("creatingSigner");
    window.setTimeout(function () {
      try {
        downloadProfileFromBinary(signText(plist, createKayatoIdentity()), "kayato-generated.signed.mobileconfig");
        cachedKayatoIdentity = null;
        clearSensitiveProfileFields();
        success(t("generatedSigned"));
      } catch (err) {
        fail(err.message || t("signFailed"));
      } finally {
        clearBusy(button);
      }
    }, 10);
  }

  function processSign() {
    var file = get("unsignedProfile").files[0];
    var button = get("signProfile");
    if (!file) return fail(t("chooseUnsigned"));

    setBusy(button, cachedKayatoIdentity || selectedSigningMode() !== "auto" ? t("signing") : t("creatingSigner"));
    Promise.all([readFileAsArrayBuffer(file), getSigningIdentity()]).then(function (result) {
      var binary = arrayBufferToBinary(result[0]);
      var identity = result[1];
      var signed = signBinary(binary, identity);
      var name = (file.name || "profile.mobileconfig").replace(/\.mobileconfig$/i, "") + ".signed.mobileconfig";
      downloadProfileFromBinary(signed, name);
      success(t("signedReady"));
    }).catch(function (err) {
      fail(err.message || t("signFailed"));
    }).then(function () {
      cachedKayatoIdentity = null;
      clearSensitiveSigningFields();
      clearBusy(button);
    });
  }

  function processUnsign() {
    var file = get("signedProfile").files[0];
    var button = get("unsignProfile");
    if (!file) return fail(t("chooseSigned"));

    setBusy(button, t("unsigning"));
    readFileAsArrayBuffer(file).then(function (buffer) {
      var content = extractSignedContent(arrayBufferToBinary(buffer));
      var name = (file.name || "profile.mobileconfig").replace(/\.mobileconfig$/i, "") + ".unsigned.mobileconfig";
      downloadProfileFromBinary(content, name);
      clearValue("signedProfile");
      success(t("unsignedReady"));
    }).catch(function (err) {
      fail(err.message || t("unsignFailed"));
    }).then(function () {
      clearBusy(button);
    });
  }

  function updateInstallFields() {
    var source = document.querySelector("input[name='installSource']:checked").value;
    toggle(get("installFileFields"), source === "file");
    toggle(get("installUrlFields"), source === "url");
    toggle(get("installXmlFields"), source === "xml");
  }

  function updateSignFields() {
    var mode = selectedSigningMode();
    toggle(get("autoFields"), mode === "auto");
    toggle(get("p12Fields"), mode === "p12");
    toggle(get("pemFields"), mode === "pem");
  }

  function updateProfileFields() {
    var type = get("profileType").value;
    toggle(get("wifiFields"), type === "wifi");
    toggle(get("mailFields"), type === "mail");
    toggle(get("davFields"), type === "carddav" || type === "caldav");
  }

  function switchPanel(panelId) {
    var panels = document.querySelectorAll(".app-panel");
    var tabs = document.querySelectorAll(".tab");
    each(panels, function (panel) {
      toggle(panel, panel.id === panelId);
    });
    each(tabs, function (tab) {
      if (tab.getAttribute("data-panel") === panelId) addClass(tab, "active");
      else removeClass(tab, "active");
    });
  }

  function warnWhenSafariIsMissing() {
    var ua = navigator.userAgent || "";
    var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var isSafari = /^((?!chrome|crios|android|edg|firefox|fxios|samsungbrowser).)*safari/i.test(ua);
    if (isIOS && !isSafari) toggle(get("browserModal"), true);
  }

  function bind() {
    each(document.querySelectorAll(".tab"), function (tab) {
      tab.onclick = function () {
        switchPanel(tab.getAttribute("data-panel"));
      };
    });
    each(document.querySelectorAll("input[name='installSource']"), function (input) {
      input.onchange = updateInstallFields;
    });
    each(document.querySelectorAll("input[name='signMode']"), function (input) {
      input.onchange = updateSignFields;
    });

    get("profileType").onchange = updateProfileFields;
    get("processInstall").onclick = processInstall;
    get("generateProfile").onclick = processGenerate;
    get("signProfile").onclick = processSign;
    get("unsignProfile").onclick = processUnsign;
    get("trySampleUrl").onclick = function () {
      get("fileUrl").value = sampleUrl;
      document.querySelector("input[name='installSource'][value='url']").checked = true;
      updateInstallFields();
    };
    get("trySampleCode").onclick = function () {
      get("xmlCode").value = sampleProfile;
      document.querySelector("input[name='installSource'][value='xml']").checked = true;
      updateInstallFields();
      success(t("sampleInserted"));
    };
    get("hideModal").onclick = function () {
      toggle(get("browserModal"), false);
    };
    get("languageSelect").onchange = function () {
      applyLanguage(get("languageSelect").value);
    };
    get("themeToggle").onclick = function () {
      applyTheme(document.body.className.indexOf("dark") > -1 ? "light" : "dark");
    };
  }

  bind();
  applyTheme(initialTheme());
  applyLanguage("en");
  updateInstallFields();
  updateSignFields();
  updateProfileFields();
  warnWhenSafariIsMissing();
})();
