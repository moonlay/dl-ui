import React from 'react';
import UnitPaymentPriceCorrectionNoteItemReact from './unit-payment-price-correction-note-item-react.jsx';
'use strict';

export default class UnitPaymentPriceCorrectionNoteCollectionReact extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleItemChange(item) {
        this.setState({ value: this.state.value });
    }
    componentWillMount() {
        this.setState({ value: this.props.value || [], error: this.props.error || [], options: this.props.options || {} });
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value || [], error: props.error || [], options: props.options || {} });
    }

    render() {
        var items = this.state.value || [];
        var error = this.state.error || {};
        
        var items = (this.state.value || []).map((item, index) => {
            var error = this.state.error[index] || {};
            return (
                <UnitPaymentPriceCorrectionNoteItemReact key={"__item" + index} value={item} error={error} options={this.state.options} onChange={this.handleItemChange}></UnitPaymentPriceCorrectionNoteItemReact>
            );
        })
        
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th width="25%">No. PO Eksternal</th>
                        <th width="17%">No. PR</th>
                        <th width="15%">Barang</th>
                        <th width="10%">Jumlah</th>
                        <th width="13%">Satuan</th>
                        <th width="10%">Harga Satuan</th>
                        <th width="10%">Harga Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
} 