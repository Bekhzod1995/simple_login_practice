import React, { Component } from 'react';
import {
    Table,
    Form,
    Icon,
    Input,
    Button,
    Layout,
    Popconfirm
} from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import EditableCell, { EditableContext } from './Context';
import Dashboard from './Dashboard';

const { Content, Header } = Layout;

const hasErros = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

const mapStateToProps = (state) => ({
    // usersTableLoaded: state.userHandler.usersTableLoaded,
    isLogged: state.logInHandler.isLogged,
    usersTableData: state.userHandler.usersTableData,
    activeData: state.userHandler.activeData,
    // userTableIdLoaded: state.userHandler.userTableIdLoaded,
    userData: state.userHandler.userData,
    is_usersTableLoaded: state.userHandler.is_usersTableLoaded,
    is_userFound: state.userHandler.is_userFound
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
class Users extends Component {
    componentWillMount = () => {
        const { setActiveMenuUsers } = this.props;
        setActiveMenuUsers();
    }
    componentDidMount = () => {
        console.log('this is props from userss: ', this.props);
        const {
            getUsers,
            setActiveMenuUsers,
            getUserById,
            isLogged
        } = this.props;
        this.props.form.validateFields();
        getUsers();
        setActiveMenuUsers();
        console.log('isLogged', isLogged);
        if (localStorage.getItem('userToken') === null) {
            if (!isLogged) {
                this.props.history.push('/');
            }
        }
        const params = new URLSearchParams(this.props.location.search);
        if ((params.get('search') !== null)) {
            getUserById({ search: params.get('search') });
        }
    };
    componentDidUpdate = () => {
        const { isLogged } = this.props;
        if (localStorage.getItem('userToken') === null) {
            if (!isLogged) {
                this.props.history.push('/');
            }
        }
    }


    state = {
        data: '',
        editingKey: ''
    }

    columnsForUsers = [
        {
            title: 'Юзер',
            dataIndex: 'user',
            key: 'user',
            editable: true
        },
        {
            title: 'Баланс',
            dataIndex: 'balance',
            key: 'balance',
            editable: true
        },
        {
            title: 'Retail Point Name',
            dataIndex: 'retailpointname',
            key: 'retailpointname',
            editable: true
        },
        {
            title: 'Активный',
            dataIndex: 'is_active',
            key: 'is_active',
            editable: true
        },
        {
            title: 'Язык',
            dataIndex: 'lang',
            key: 'lang',
            editable: true
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (text, record) => {
                const { editingKey } = this.state;
                const editable = this.isEditing(record);
                return editable ? (
                    <span>
                        <EditableContext.Consumer>
                            {form => (
                                <a
                                    onClick={() => this.save(form, record.key)}
                                    style={{ marginRight: 8 }}
                                >
                                    Сохранить
                                </a>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm title="Отменить изменения?" onConfirm={() => this.cancel(record.key)}>
                            <a>Отменить</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                            Изменить
                    </a>
                );
            }
        }
    ];

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save (form, key) {
        const { updateUser } = this.props;
        form.validateFields(async (error, row) => {
            await updateUser({ ...row, is_active: row.is_active === 'да' ? true : false }, parseInt(key, 10));
            if (error) {
                return;
            }

            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
            const { getUserById } = this.props;
            getUserById({ search: parseInt(key, 10) });
        });
    }

    edit (key) {
        this.setState({ editingKey: key });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { getUserById } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (!(values.search === null || values.search === undefined)) {
                    getUserById(values);
                    this.props.history.push(`/admin/users?search=${values.search}`);
                }
            }
        });
    };

    render () {
        const {
            usersTableData,
            activeData,
            userData,
            is_usersTableLoaded,
            is_userFound,
            getUsers,
            logOut
        } = this.props;
        
        const components = {
            body: {
                cell: EditableCell
            }
        };

        const columns = this.columnsForUsers.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text', //need to rewatch
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record)
                })
            };
        });

        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;


        const displayTableData = () => {
            if (activeData === 'User') {
                if (is_userFound) {
                    return [{
                        key: userData.id.toString(),
                        user: userData.phone,
                        balance: userData.balance,
                        retailpointname: userData.retail_point_name,
                        is_active: userData.is_active ? 'да' : 'нет',
                        lang: userData.lang
                        // description: () => {
                        //     const innerTable = tableRowItem.choices.map(descriptionItem => {
                        //         return (
                        //             <ul key={descriptionItem.id}>
                        //                 <li key={descriptionItem.question_id}>
                        //                     <b>Вопрос:</b> {descriptionItem.question}
                        //                     <br />
                        //                     <b>Текст на Русском:</b> {descriptionItem.text_ru}
                        //                     {/* <br /> */}
                        //                     {/* <b>Текст на Узбекском:</b> {descriptionItem.text_uz} */}
                        //                 </li>
                        //             </ul>
                        //         );
                        //     }
                        //     );
                        //     return innerTable;
                        // }
                    }];
                }
                return null;
            }

            if (activeData === 'UsersList') {
                if (is_usersTableLoaded) {
                    // console.log('***********', usersTableData);
                    const dataToShow = usersTableData.map(tableRowItem => {
                        return {
                            key: tableRowItem.id.toString(),
                            user: tableRowItem.phone,
                            balance: tableRowItem.balance,
                            retailpointname: tableRowItem.retail_point_name,
                            is_active: tableRowItem.is_active ? 'да' : 'нет',
                            lang: tableRowItem.lang
                            // description: () => {
                            //     const innerTable = tableRowItem.choices.map(descriptionItem => {
                            //         return (
                            //             <ul key={descriptionItem.id}>
                            //                 <li key={descriptionItem.question_id}>
                            //                     <b>Вопрос:</b> {descriptionItem.question}
                            //                     <br />
                            //                     <b>Текст на Русском:</b> {descriptionItem.text_ru}
                            //                     {/* <br /> */}
                            //                     {/* <b>Текст на Узбекском:</b> {descriptionItem.text_uz} */}
                            //                 </li>
                            //             </ul>
                            //         );
                            //     }
                            //     );
                            //     return innerTable;
                            // }
                        };
                    });
                    return dataToShow;
                }
                return null;
            }
        };

        const setWhichLoading = () => {
            if (activeData === 'UsersList') {
                if (is_usersTableLoaded) {
                    return false;
                }
                return true;
            }

            if (activeData === 'User') {
                if (is_userFound) {
                    return false;
                }
                return true;
            }
        };
        const searchError = isFieldTouched('search') && getFieldError('search');
        return (
            <>
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
                                <Form layout="inline" onSubmit={this.handleSubmit}>
                                    <Form.Item label="Найти" validateStatus={searchError ? 'error' : ''} help={searchError || ''}>
                                        {getFieldDecorator('search', {
                                            // rules: [{ required: true, message: 'Please input your username!' }]
                                        })(
                                            <Input
                                                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="id..."
                                            />,
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" disabled={hasErros(getFieldsError())}>
                                            Найти
                                        </Button>
                                    </Form.Item>
                                    <Button onClick={() => {
                                        this.props.history.push('/admin/users');
                                        return getUsers();
                                    }} type="primary" style={{ float: 'right', marginTop: '5px' }}>Все пользователи</Button>
                                </Form>

                                <h1>Пользователи</h1>
                                <EditableContext.Provider value={this.props.form}>
                                    <Table
                                        components={components}
                                        columns={columns}
                                        loading={setWhichLoading()}
                                        dataSource={displayTableData()}
                                        rowClassName="editable-row"
                                    // expandedRowRender={record => record.description()}
                                    // onChange={pagination => handleChange(pagination)}
                                    />
                                </EditableContext.Provider>
                            </Content>
                        </Header>
                    </Layout>
                </Layout>
            </>
        );
    }
}
const User = Form.create({ name: 'Users' })(Users);
export default User;
