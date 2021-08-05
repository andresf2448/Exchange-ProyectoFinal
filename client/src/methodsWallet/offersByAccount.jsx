import { Typography, Card, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import useStyles from 'styles';

export default function OffersByAccount({ offers }) {
  const classes= useStyles();

  return (
    <Card  style={{
        textAlign: "center",
        height: "45vh",
        width: '90%',
        marginLeft:'5%',
        marginRight:'5%'
      }}>
      <Typography>Active Sale Offers List</Typography>
      <TableContainer className={classes.tableScroll}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers?.records?.length > 1 &&
              offers.records.map((offer) => (
                <TableRow key={offer.id} hover={{backgroundColor:'black'}}>
                  <TableCell align='center'>{parseFloat(offer.amount)}</TableCell>
                  <TableCell>{offer.buying?.asset_code}</TableCell>
                  <TableCell align='center'>{parseFloat(offer.price)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}