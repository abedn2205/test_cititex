import React, { Component } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProformItem: [],
      dataLocation: [],
      dataproformaInfoId: [],
    };
    this.getDataProformaItem = this.getDataProformaItem.bind(this);
  }
  getDataProformaItem() {
    axios.get("http://localhost:3001/proformaItem").then((res) => {
      this.setState({
        dataProformItem: res.data,
      });
      console.log(res);
    });
  }

  getDataLocation() {
    axios.get("http://localhost:3001/location").then((res) => {
      this.setState({
        dataLocation: res.data,
      });
      console.log(res.data);
    });
  }

  getDataproformaInfoId() {
    axios.get("http://localhost:3001/proformaInfoId").then((res) => {
      this.setState({
        dataproformaInfoId: res.data,
      });
      console.log(res.data);
    });
  }
  componentDidMount() {
    this.getDataProformaItem();
    this.getDataLocation();
    this.getDataproformaInfoId();
  }
  render() {
    return (
      <div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              {this.state.dataLocation.map((data, index) => {
                return (
                  <Table.HeaderCell key={index.id}>
                    {data.name}
                  </Table.HeaderCell>
                );
              })}

              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Total Stock</Table.HeaderCell>
              <Table.HeaderCell>Percent</Table.HeaderCell>
              <Table.HeaderCell>Total Order</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.dataProformItem.map((data, index) => {
              const stock = JSON.parse(data.product_stock);
              const items = JSON.parse(data.items);
              let jumlah = 0;
              stock.map((jlhStock) => {
                if (jlhStock[1] !== undefined) {
                  jumlah += jlhStock[1];
                }
                if (jlhStock[3] !== undefined) {
                  jumlah += jlhStock[3];
                }
                if (jlhStock[5] !== undefined) {
                  jumlah += jlhStock[5];
                }
                return jumlah;
              });
              return (
                <Table.Row key={index}>
                  <Table.Cell>{stock.map((key) => key[1])}</Table.Cell>
                  <Table.Cell>{stock.map((key) => key[3])}</Table.Cell>
                  <Table.Cell>{stock.map((key) => key[5])}</Table.Cell>
                  <Table.Cell>{data.categoryDescription}</Table.Cell>
                  <Table.Cell>{data.productDescription}</Table.Cell>
                  <Table.Cell>{jumlah}</Table.Cell>
                  <Table.Cell>
                    {String((1 / 567) * 100).slice(0, -12)}
                  </Table.Cell>
                  <Table.Cell>{items.map((key) => key["qty"])}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
