import { useState } from "react";
import { Row, Col, Input, InputGroup, InputGroupText } from "reactstrap";
import RestaurantList from "../components/RestaurantsList";

// nafe
const index = () => {
  // 検索ボックスの文字列
  const [query, setQuery] = useState("");

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              <InputGroupText>探す</InputGroupText>
              <Input
                placeholder="レストラン名を入力してください"
                onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
              />
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>{`
        .search {
          margin: 20px;
          width: 500px;
        }
      `}</style>
    </div>
  );
};

export default index;
