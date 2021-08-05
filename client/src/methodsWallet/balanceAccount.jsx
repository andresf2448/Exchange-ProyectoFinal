import {useEffect} from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import useStyles from "styles";
import HashLoader from "react-spinners/HashLoader";
import { useSelector, useDispatch } from "react-redux";
import { getFullBalance } from "redux/actions/actions";

export default function BalanceAccount() {
  const classes = useStyles();
  const fullAssets = useSelector((state) => state.fullAssets);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFullBalance())
  }, [fullAssets, dispatch])

  return (
    <div>
      {account ? (
        <div>
          {fullAssets ? (
            <div>
              <TableContainer
                className={classes.adminTableContainer}
                style={{ marginBottom: "3vh", marginTop: "3vh" }}
              >
                <Table stickyHeader className={classes.adminTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Asset</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Mount of selling offers</TableCell>
                      <TableCell>Mount of buying offers</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fullAssets.map(
                      ({
                        balance,
                        asset_code,
                        selling_liabilities,
                        buying_liabilities,
                      }) => {
                        return (
                          <TableRow hover={{ backgroundColor: "black" }}>
                            <TableCell align="center">
                              {!asset_code ? "XLM" : asset_code}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(balance).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(selling_liabilities).toFixed(2)}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(buying_liabilities).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <HashLoader color={"#ffd523"} size={30} />
          )}
        </div>
      ) : (
        <Typography variant="h4">
          Create an account to see your balance
        </Typography>
      )}
    </div>
  );
}
