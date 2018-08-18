import React, { Component } from 'react'

import Logo from './Logo'

import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="Footer__group">
            <Logo className="Footer__title" />
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
              <a target="_blank" href="https://github.com/cnaa97">
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
            <div className="Footer__container">
      Made with <i className="far fa-kiss-wink-heart" /> and <i className="fas fa-swimmer" />
    </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
