import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import qqmap from 'qqmap'

import './FormMap.scss'

/**
 * 地图组件
 */
export default function FormMap({ data }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!data.address) return
    qqmap.init('6S5BZ-2JZCW-6MHR6-OCLUL-AFT55-UGBR2', () => {
      const geo = new qqmap.Geocoder()
      geo.getLocation(data.address || '北京')
      geo.setComplete(res => {
        const location = res.detail.location
        const center = new qqmap.LatLng(location.lat, location.lng)

        const map = new qqmap.Map(mapRef.current, {
          center,
          zoom: 8,
          mapStyleId: 'style1'
        })
        const infoWin = new qqmap.InfoWindow({ map })
        if (data.required) {
          infoWin.open()
          infoWin.setContent(`<div>${data.companyAddress || '北京市'}</div>`)
          infoWin.setPosition(center)
        }
      })
    })
    return () => {}
  }, [data])

  return (
    <div className="act-form__map">
      <div ref={mapRef}></div>
    </div>
  )
}
FormMap.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
}
