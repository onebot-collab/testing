import React, { Component } from 'react'
import './Actual.css'
// @material-ui/core components
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import TablePagination from '@material-ui/core/TablePagination'
// @material-ui/icons components
import Visibility from '@material-ui/icons/Visibility'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import avatar from '../../assets/img/faces/marc.jpg'

export default class User extends Component {
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">Add User</h4>
                <p className="cardCategoryWhite">by Admin</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="Company (disabled)"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="First Name"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA' }}>
                      About me
                    </InputLabel>
                    <CustomInput
                      labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="danger">Submit</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardHeader color="danger">
                <h4 className="cardTitleWhite">List User</h4>
                <p className="cardCategoryWhite">100</p>
              </CardHeader>
              <CardBody>
                <Grid item xs={12} sm={12} md={12}>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <List className="listContactRow">
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={avatar} />
                      </ListItemAvatar>
                      <ListItemText>Samantha</ListItemText>
                      <ListItemSecondaryAction>
                        <Visibility edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <TablePagination
                    component="div"
                    count={100}
                    rowsPerPageOptions={[null]}
                  />
                </Grid>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
