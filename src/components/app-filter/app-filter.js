import { Component } from "react";

import "./app-filter.css";

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBtn: this.props.filterParam
        }
    }

    onClick = (e) => {
        this.props.onFilterChange(e.target.getAttribute("data-filter"));
        this.updateActiveBtn(e.target.getAttribute("data-filter"));
    }

    updateActiveBtn = (param) => {
        const defaultClassName = 'btn btn-outline-light';
        const activeClassName = 'btn btn-light';
        const btns = document.querySelectorAll('.btn-group .btn');

        btns.forEach(item => {
            if (item.getAttribute('data-filter') === param) {
                item.classList.value = activeClassName;
            } else {
                item.classList.value = defaultClassName;
            }
        });

        this.setState({activeBtn: param})
    }

    render() {
        return (
            <div className="btn-group">
                <button type="button"
                        data-filter="all"
                        onClick={this.onClick}
                        className="btn btn-light">
                        Все сотрудники
                </button>
                <button type="button"
                        onClick={this.onClick}
                        data-filter="increase"
                        className="btn btn-outline-light">
                        На повышение
                </button>
                <button type="button"
                        onClick={this.onClick}
                        data-filter="salary"
                        className="btn btn-outline-light">
                        З/П больше 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter;