import { Row, Col, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import Link from "next/link";

// nafe
const RestaurantList = () => {
  return (
    <Row>
      <Col xs="6" sm="4">
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            src="http://localhost:1337/uploads/thumbnail_restaurant1_78f6738a9c.jpg"
            top={true}
            sytle={{ height: 250 }}
          />
          <CardBody>
            <CardTitle>Italian restaurant</CardTitle>
            <CardTitle>イタリアンのレストランです。</CardTitle>
          </CardBody>
          <div className="card-footer">
            <Link href="/restaurants?id=1" as="/restaurants/1">
              <a className="btn btn-primary">もっとみる</a>
            </Link>
          </div>
        </Card>
      </Col>
      <style jsx>
        {`
          a {
            color: white;
          }
          a:link {
            text-decoration: none;
            color: white;
          }
          .card-colums {
            column-connt: 3;
          }
        `}
      </style>
    </Row>
  );
};

export default RestaurantList;
