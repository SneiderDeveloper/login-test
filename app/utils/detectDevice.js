export const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    let device = "Unknown";
    let version = "Unknown";

    if (/iphone|ipad|ipod/.test(userAgent)) {
      device = "iPhone/iPad/iPod";
      const versionMatch = userAgent.match(/os (\d+_\d+)/);
      if (versionMatch) {
        version = versionMatch[1].replace('_', '.');
      }
    } else if (/android/.test(userAgent)) {
      device = "Android";
      const versionMatch = userAgent.match(/android (\d+(\.\d+)?)/);
      if (versionMatch) {
        version = versionMatch[1];
      }
    } else if (/macintosh|mac os x/.test(userAgent)) {
      device = "MacOs";
      const versionMatch = userAgent.match(/mac os x (\d+[_\d]+)/);
      if (versionMatch) {
        version = versionMatch[1].replace(/_/g, '.');
      }
    } else if (/windows/.test(userAgent)) {
      device = "Windows";
      const versionMatch = userAgent.match(/windows nt (\d+(\.\d+)?)/);
      if (versionMatch) {
        version = versionMatch[1];
      }
    }

    return `${device} ${version}`;
}