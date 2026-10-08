import type { Coordinates } from '../types'

export const getCurrentLocation = (): Promise<Coordinates> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Trình duyệt này không hỗ trợ lấy vị trí.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Bạn chưa cấp quyền truy cập vị trí. Hãy cho phép trong cài đặt trình duyệt rồi thử lại.'))
            break
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Không xác định được vị trí hiện tại. Vui lòng thử lại hoặc chọn khu vực thủ công.'))
            break
          case error.TIMEOUT:
            reject(new Error('Yêu cầu lấy vị trí đã hết thời gian. Vui lòng thử lại.'))
            break
          default:
            reject(new Error('Không thể lấy vị trí hiện tại. Vui lòng thử lại.'))
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 60_000,
      },
    )
  })
