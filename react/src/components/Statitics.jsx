import React, { Component } from 'react';
import {
    Table,
    Layout,
    Icon,
    Button
} from 'antd';
import { columnsForQuestionnaire } from '../tableData';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Dashboard from './Dashboard';

const {
    Header,
    Content
} = Layout;


const mapStateToProps = (state) => ({
    is_tableLoaded: state.logInHandler.is_tableLoaded,
    responseResult: state.logInHandler.getListResult,
    isLogged: state.logInHandler.isLogged
});
const trigger = {
    fontSize: '18px',
    lineHeight: '64px',
    padding: '0 24px',
    cursor: 'pointer',
    transition: 'color 0.3s'
};

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    background: '#fff',
    minHeight: 280
};

const exit = {
    fontSize: '14px',
    lineHeight: '64px',
    padding: '0 24px',
    cursor: 'pointer',
    float: 'right'
};

@connect(mapStateToProps, actionCreators)
class Statistics extends Component {
    componentWillMount = () => {
        const { setActiveMenuStatistics } = this.props;
        setActiveMenuStatistics();
    }
    componentDidMount = () => {
        const { getListofAnswers, setActiveMenuStatistics, isLogged } = this.props;
        if (localStorage.getItem('userToken') === null) {
            if (!isLogged) {
                this.props.history.push('/');
            }
        }
        const params = new URLSearchParams(this.props.location.search);
        getListofAnswers(params.get('page'), params.get('page_size'));
        setActiveMenuStatistics();
    }
    componentDidUpdate = () => {
        const { isLogged } = this.props;
        if (localStorage.getItem('userToken') === null) {
            if (!isLogged) {
                this.props.history.push('/');
            }
        }
    }

    state = {
        collapsed: false
    };

    render () {
        const {
            is_tableLoaded,
            responseResult,
            logOut
        } = this.props;


        const displayTableData = () => {
            if (is_tableLoaded) {
                const dataToShow = responseResult.map(tableRowItem => {
                    return {
                        key: tableRowItem.id.toString(),
                        user: tableRowItem.user,
                        finished: tableRowItem.is_finished ? 'да' : 'нет',
                        questionnaire: tableRowItem.questionnaire,
                        description: () => {
                            const innerTable = tableRowItem.choices.map(descriptionItem => {
                                return (
                                    <ul key={descriptionItem.id}>
                                        <li key={descriptionItem.question_id}>
                                            <b>Вопрос:</b> {descriptionItem.question}
                                            <br />
                                            <b>Текст на Русском:</b> {descriptionItem.text_ru}
                                            {/* <br /> */}
                                            {/* <b>Текст на Узбекском:</b> {descriptionItem.text_uz} */}
                                        </li>
                                    </ul>
                                );
                            }
                            );
                            return innerTable;
                        }
                    };
                });
                return dataToShow;
            }
            return null;
        };


        return (
            <Layout style={{
                height: '100vh'
            }}>
                <Dashboard {...this.props} />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={trigger}
                        />
                        <Button style={exit} type="link" onClick={() => logOut()}>Выход</Button>
                        <Content style={contentStyle}>
                            <h2>Cтатистика</h2>
                            <Table
                                columns={columnsForQuestionnaire}
                                loading={!is_tableLoaded}
                                dataSource={displayTableData()}
                                expandedRowRender={record => record.description()}
                            // onChange={pagination => handleChange(pagination)}
                            />
                        </Content>
                    </Header>
                </Layout>
            </Layout>
        );
    }
}

export default Statistics;
