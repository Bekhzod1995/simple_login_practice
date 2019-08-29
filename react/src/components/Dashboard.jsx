import React, { Component } from 'react';
import {
    Layout,
    Menu,
    Icon
} from 'antd';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

const {
    Sider
} = Layout;


const mapStateToProps = (state) => ({
    activeMenu: state.logInHandler.activeMenu
});


@connect(mapStateToProps, actionCreators)
class Dashboard extends Component {
    state = {
        collapsed: false
    };


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };


    render () {
        const {
            activeMenu
        } = this.props;

        return (
            <>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" style={{
                            height: '32px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            margin: '16px'
                        }} />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${activeMenu}`]}>
                            <Menu.Item key="1" onClick={() => {
                                this.props.history.push(
                                    '/admin/dashboard?page=1&page_size=10&choices=all&is_finished=true'
                                );
                            }
                            }>
                                <Icon type="pie-chart" />
                                <span>Cтатистика</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => {
                                this.props.history.push('/admin/users');
                            }}>
                                <Icon type="user" />
                                <span>Пользователи</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
            </>
        );
    }
}


export default Dashboard;
