import axios from 'axios';

interface IPLocation {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

export default async function getIPLocation(ip: string): Promise<IPLocation> {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 5000,
      headers: {
        'User-Agent': 'MCPEngineWeb/1.0',
      },
    });

    if (response.data.error) {
      throw new Error(response.data.reason || 'IP查询失败');
    }

    return {
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country_name: response.data.country_name,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
    };
  } catch (error) {
    console.error('IP定位失败:', error);
    throw new Error('无法获取地理位置信息');
  }
}

// 使用示例
// getIPLocation('46.232.48.130')
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
