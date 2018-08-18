import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="Footer__group">
            <h3 className="Footer__title">DESCRO</h3>
            <div className="group">
              <h3 className="title">contributors</h3>
              <a target="_blank" href="https://github.com/colus001">
                Alma
                <span>🏄</span>
              </a>
              <a target="_blank" href="#">
                Sunghyun
                <span>🐱</span>
              </a>
              <a target="_blank" href="https://github.com/">
                Junho
                <span>🍺</span>
              </a>
              <a target="_blank" href="https://github.com/yogicat">
                Ohda
                <span>🌞</span>
              </a>
            </div>
            <div className="group">
              <h3 className="title">about</h3>
              <p>
                데스크로는 크립토 온더 비치(Crypto on the beach) 해커톤 프로젝트로 탈중앙화된 안전한
                에스크로를 향한 아이디어로부터 만들어 졌습니다. 모두가 쉽게 사용할 수 있는
                데스크로를 만들기 위해 양양에서 대(동)강과 대동단결
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
