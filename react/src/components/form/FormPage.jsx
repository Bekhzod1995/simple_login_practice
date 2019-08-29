import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

const formStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px'
};

const mapStateToProps = (state) => ({
    isLogged: state.logInHandler.isLogged,
    requestIsPending: state.logInHandler.requestIsPending,
    currentPage: state.logInHandler.currentPage,
    pageSize: state.logInHandler.pageSize
});

@connect(mapStateToProps, actionCreators)
class FormPage extends Component {
    componentDidMount = () => {
        const { isLogged } = this.props;
        if (isLogged) {
            this.props.history.push(
                `/admin/dashboard?page=1&page_size=10&choices=all&is_finished=true`
            );
        }
    }
    componentDidUpdate = () => {
        const { isLogged } = this.props;
        if (isLogged) {
            this.props.history.push(
                `/admin/dashboard?page=1&page_size=10&choices=all&is_finished=true`
            );
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {
            login
        } = this.props;
        this.props.form.validateFields(async (err, values) => {
            login(values);
        });
    };


    render () {
        const { getFieldDecorator } = this.props.form;
        const {
            requestIsPending
        } = this.props;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle} autoComplete="off">
                <h2>Вход</h2>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }]
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Имя пользователя"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }]
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Пароль"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button loading={requestIsPending} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


const Formm = Form.create({ name: 'form' })(FormPage);
export default Formm;
