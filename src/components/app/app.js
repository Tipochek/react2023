import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 600, increase: true, rise: false, id: 1},
                {name: 'John C.', salary: 1000, increase: false, rise: true, id: 2},
                {name: 'Alex M.', salary: 400, increase: true, rise: false, id: 3},
                {name: 'Alex M.', salary: 3000, increase: false, rise: true, id: 4},
                {name: 'Carl W.', salary: 800, increase: true, rise: false, id: 5},
                {name: 'Carl W.', salary: 5000, increase: false, rise: true, id: 6}
            ],
            findEmployee: '',
            defaultSort: 'all',
        }
        this.maxId = 7;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    findEmployee = (filter, data) => {
        if (filter === '') return data;

        return data.filter(item => (item.name.indexOf(filter) > -1));
    }

    onUpdateSearchValue = (filter) => {
        this.setState({findEmployee: filter})
    }

    dataSortByFilter = (data, filter) => {
        switch (filter) {
            case 'increase':
                return data.filter(item => (item.increase));
            case 'salary':
                return data.filter(item => (item.salary >= 1000));
            default:
                return data;
        }
    }

    onFilterChange = (param) => {
        this.setState({
            defaultSort: param
        });
    }

    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.dataSortByFilter(this.findEmployee(this.state.findEmployee, this.state.data), this.state.defaultSort);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearchValue={this.onUpdateSearchValue}/>
                    <AppFilter onFilterChange={this.onFilterChange} filterParam={this.state.defaultSort}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    findEmployee={this.findEmployee}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
