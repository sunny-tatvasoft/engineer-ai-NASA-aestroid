import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { CssBaseline } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { getAsteroidByID, getAsteroids } from '../../services/asteroidService';
import { getRandomArrayIndex } from '../../utils/helper';


export interface Asteroid {
    links: string;
    id: string;
    neo_reference_id: string;
    name: string;
    name_limited: string;
    designation: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: any;
    is_potentially_hazardous_asteroid: boolean;
    orbital_data: any;
    is_sentry_object: boolean;
}

export interface NearEarthObject {
    links: string;
    id: string;
    neo_reference_id: string;
    name: string;
    name_limited: string;
    designation: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: any;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: any;
    orbital_data: any;
    is_sentry_object: boolean;
}
export interface DemoApiData {
    links: string;
    page: any;
    near_earth_objects: NearEarthObject[];
}
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AsteroidForm: React.FC = () => {
    const classes = useStyles();
    const [asteroidIdInput, setAsteroidIdInput] = useState<string>('');
    const history = useHistory();
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form
                        className={classes.form}
                        noValidate
                        autoComplete="off"
                        onSubmit={(event) => {
                            event.preventDefault();

                            // call api with asteroid Id
                            getAsteroidByID(asteroidIdInput)
                                .then((response: AxiosResponse<Asteroid>) => {
                                    history.push("/asteroid", { astroidData: response.data });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        <TextField
                            value={asteroidIdInput}
                            required
                            fullWidth
                            autoFocus
                            label="Enter Asteroid Id"
                            variant="outlined"
                            onChange={(event) => {
                                const { value } = event.target;
                                setAsteroidIdInput(value);
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={asteroidIdInput.length > 0 ? false : true}
                            type="submit"
                            fullWidth
                            className={classes.submit}

                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            className={classes.submit}
                            onClick={(event) => {
                                event.preventDefault();

                                // call api with asteroid Id
                                getAsteroids()
                                    .then((response: AxiosResponse<DemoApiData>) => {
                                        const random = getRandomArrayIndex(20)
                                        const randomAstroidId = response.data.near_earth_objects[random].id;

                                        console.log(randomAstroidId)
                                        getAsteroidByID(randomAstroidId)
                                            .then((response: AxiosResponse<Asteroid>) => {
                                                history.push("/asteroid", { astroidData: response.data });
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            Random Asteroid
                        </Button>
                    </form>
                </div>
            </Container>
        </div>

    );
}

export default AsteroidForm;