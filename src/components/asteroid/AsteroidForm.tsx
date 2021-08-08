import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import http from '../../services/http.service';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { CssBaseline } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { ASTEROID_API_ACCESS_KEY } from '../../utils/constants';
export interface AsteroidFormProps {
    
}

export interface Links {
    self: string;
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Miles {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Feet {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters;
    miles: Miles;
    feet: Feet;
}

export interface RelativeVelocity {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
}

export interface MissDistance {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
}

export interface CloseApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: any;
    relative_velocity: RelativeVelocity;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface OrbitClass {
    orbit_class_type: string;
    orbit_class_description: string;
    orbit_class_range: string;
}

export interface OrbitalData {
    orbit_id: string;
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    data_arc_in_days: number;
    observations_used: number;
    orbit_uncertainty: string;
    minimum_orbit_intersection: string;
    jupiter_tisserand_invariant: string;
    epoch_osculation: string;
    eccentricity: string;
    semi_major_axis: string;
    inclination: string;
    ascending_node_longitude: string;
    orbital_period: string;
    perihelion_distance: string;
    perihelion_argument: string;
    aphelion_distance: string;
    perihelion_time: string;
    mean_anomaly: string;
    mean_motion: string;
    equinox: string;
    orbit_class: OrbitClass;
}

export interface Asteroid {
    links: Links;
    id: string;
    neo_reference_id: string;
    name: string;
    name_limited: string;
    designation: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    orbital_data: OrbitalData;
    is_sentry_object: boolean;
}

export interface Links {
    next: string;
    self: string;
}

export interface Page {
    size: number;
    total_elements: number;
    total_pages: number;
    number: number;
}

export interface Links2 {
    self: string;
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Miles {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Feet {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters;
    miles: Miles;
    feet: Feet;
}

export interface RelativeVelocity {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
}

export interface MissDistance {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
}

export interface CloseApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: any;
    relative_velocity: RelativeVelocity;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface OrbitClass {
    orbit_class_type: string;
    orbit_class_description: string;
    orbit_class_range: string;
}

export interface OrbitalData {
    orbit_id: string;
    orbit_determination_date: string;
    first_observation_date: string;
    last_observation_date: string;
    data_arc_in_days: number;
    observations_used: number;
    orbit_uncertainty: string;
    minimum_orbit_intersection: string;
    jupiter_tisserand_invariant: string;
    epoch_osculation: string;
    eccentricity: string;
    semi_major_axis: string;
    inclination: string;
    ascending_node_longitude: string;
    orbital_period: string;
    perihelion_distance: string;
    perihelion_argument: string;
    aphelion_distance: string;
    perihelion_time: string;
    mean_anomaly: string;
    mean_motion: string;
    equinox: string;
    orbit_class: OrbitClass;
}

export interface NearEarthObject {
    links: Links2;
    id: string;
    neo_reference_id: string;
    name: string;
    name_limited: string;
    designation: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproachData[];
    orbital_data: OrbitalData;
    is_sentry_object: boolean;
}

export interface DemoApiData {
    links: Links;
    page: Page;
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
const AsteroidForm: React.SFC<AsteroidFormProps> = () => {
    const classes = useStyles();
    const [asteroidIdInput, setAsteroidIdInput] = useState('');
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
                        http.get(`${asteroidIdInput}?api_key=${ASTEROID_API_ACCESS_KEY}`)
                            .then((response : AxiosResponse<Asteroid>) => {
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
                            http.get(`browse?api_key=DEMO_KEY`)
                                .then((response : AxiosResponse<DemoApiData>) => {
                                    const random = Math.floor(Math.random() * 20);
                                    const randomAstroidId =response.data.near_earth_objects[random].id;
                                   
                                   http.get(`${randomAstroidId}?api_key=${ASTEROID_API_ACCESS_KEY}`)
                                   .then((response : AxiosResponse<Asteroid>) => {
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