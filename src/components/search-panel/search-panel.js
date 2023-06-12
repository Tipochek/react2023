import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        }
    }

    findEmployee = (e) => {
        this.setState({inputValue: e.target.value});
        this.props.onUpdateSearchValue(e.target.value);
    }

    render() {
        return (
            <input type="text"
                    className="form-control search-input"
                    placeholder="Найти сотрудника"
                    onChange={this.findEmployee}/>
        )
    }
}

export default SearchPanel;