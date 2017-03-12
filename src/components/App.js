// React라는 변수명으로 react 모듈을 호출
import React from 'react';
import Contact from './Contact';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    render() {
        return (
            <div>
                <Contact/>
            </div>
        );
    }
}

// 다른 script 파일에서도 사용할 수 있도록 export
export default App;