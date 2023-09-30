import { Select } from "antd";

export const InputSelectSearchCommon = (props) => {
    const { title, value, onSelect, dataList, disabled, allowClear } = props;

    return (
        <Select
            value={value != null ? value : null}
            placeholder={title}
            allowClear={allowClear}
            showArrow={allowClear}
            showSearch
            className="w-100"
            onChange={onSelect}
            disabled={disabled}
            getPopupContainer={(trigger) => trigger.parentNode}
        // filterOption={(input, option) => {
        //     if (option.title) {
        //         return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //     }
        // }}
        >
            {
                dataList && dataList.length &&
                dataList.map((item, index) => {
                    return (
                        <Select.Option
                            key={index}
                            value={item.value}
                            title={item.label}
                        >
                            {item.label}
                        </Select.Option>
                    );
                })
            }
        </Select>
    )
};