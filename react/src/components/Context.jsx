import React, { Component } from 'react';
import {
    Input,
    InputNumber,
    Form
} from 'antd';

export const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`
                                }
                            ],
                            initialValue: record[dataIndex]
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render () {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

export default EditableCell;
