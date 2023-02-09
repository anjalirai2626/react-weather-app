import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useCityWeatherInfo, useWeatherAppState } from "../../react-query-hooks/hooks";
import { IconButton, Typography } from "@material-ui/core";
import { COUNTRY_NAMES } from "../../utils/constants";
import WeatherAppBar from "../WeatherAppBar";
import BackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    detailViewWrapper: {
        margin: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    detailViewPrimaryAction: {
        justifyContent: 'flex-start'
    },
    detailContainer: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    subDetailContainer: {
        margin: "auto",
        justifyContent: "center"
    },
    detailItem: {
        padding: 20,
        height: 'auto',
        minHeight: 80,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'left',
        border: '1px solid rgb(217, 217, 217)',
        borderRadius: 6,

    },
    primaryDetailItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center'

    }
}));

type DetailViewProps = {
    location: number[];
    isDefault?: boolean;
}

const DetailView = ({ location, isDefault }: DetailViewProps): JSX.Element => {
    const classes = useStyles();

    const { setDetailedLocation } = useWeatherAppState()
    const { data: selLocationDetailedData } = useCityWeatherInfo(location);
    const { main, sys, visibility, weather } = selLocationDetailedData

    const handleGoBack = () => setDetailedLocation([])

    const getDisplayTime = (time: number) => {
        debugger;
        let sunrise: number | Date = time * 1000
        sunrise = new Date(sunrise)
        return moment(sunrise).format("hh:mm a")
    }

    return (
        <div className={classes.detailViewWrapper}>
            <WeatherAppBar title={`${isDefault ? "My location" : selLocationDetailedData?.name}, ${COUNTRY_NAMES.of(sys?.country)}`} primaryActions={
                <div className={classes.detailViewPrimaryAction}>
                    <Link to="/">
                        <IconButton style={{ color: "#fff" }} aria-label="search" onClick={handleGoBack}>
                            <BackIcon />
                        </IconButton>
                    </Link>
                </div>
            } />
            <div className={classes.detailContainer}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <div className={classes.detailItem}>
                            <div className={classes.primaryDetailItem}>
                                {weather && weather?.length && (
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
                                        <img src={`http://openweathermap.org/img/w/${weather[0].icon}.png`} width="50px" height="50px" alt="" />
                                        <Typography variant="h3">
                                            {weather[0]?.main}
                                        </Typography>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'baseline' }}>
                                    <Typography variant="h6">{`${main?.temp} °C`}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">{`feels like ${main?.feels_like} °C`}</Typography>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {`H: ${main?.temp_max}`}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {`L: ${main?.temp_min}`}
                                    </Typography>
                                </div>

                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} className={classes.subDetailContainer}>
                            <Grid item xs={2} style={{ minWidth: 150 }}>
                                <div className={classes.detailItem}>
                                    <div className={classes.primaryDetailItem}>
                                        <Typography variant="h6">Sunrise</Typography>
                                        <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>{getDisplayTime(sys?.sunrise)}</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={2} style={{ minWidth: 150 }}>
                                <div className={classes.detailItem}>
                                    <div className={classes.primaryDetailItem}>
                                        <Typography variant="h6">Sunset</Typography>
                                        <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>{getDisplayTime(sys?.sunset)}</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className={classes.subDetailContainer}>
                            <Grid item xs={2} style={{ minWidth: 150 }}>
                                <div className={classes.detailItem}>
                                    <div className={classes.primaryDetailItem}>
                                        <Typography variant="h6" component="h2">Visibility</Typography>
                                        <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>{`${Math.floor(visibility / 1000)} km`}</Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={2} style={{ minWidth: 150 }}>
                                <div className={classes.detailItem}>
                                    <div className={classes.primaryDetailItem}>
                                        <Typography variant="h6" component="h2">Humidity</Typography>
                                        <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center' }}>{`${main?.humidity}%`}</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default DetailView;
