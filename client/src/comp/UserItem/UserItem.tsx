import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { engToRusField, fieldNamesEng, User } from "../../types";

interface props {
  users: User[];
}

export const UserItems: React.FC<props> = ({ users }) => {
  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {fieldNamesEng.map((fieldName) => (
                <TableCell key={fieldName}>
                  {engToRusField[fieldName]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, userIdx) => (
              <TableRow key={`${userIdx}${user.name}`}>
                {fieldNamesEng.map((fieldName) => {
                  if (fieldName === "name") {
                    return (
                      <TableCell key={fieldName}>
                        <Link to={`/update/${userIdx}`}>{user[fieldName]}</Link>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={fieldName}>{user[fieldName]}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

// export const UserItem: React.FC<props> = ({ user }) => {
//   return (
//     <>
//       <div className={styles.items}>
//         {fieldNamesEng.map((fieldNameEng) => {
//           return (
//             <div key={fieldNameEng} className={styles.item}>
//               <div className={styles.name}>{engToRusField[fieldNameEng]}</div>
//               <div className={styles.value}>{user[fieldNameEng]}</div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };
