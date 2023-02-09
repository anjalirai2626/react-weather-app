import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import WeatherAppBar from '../components/WeatherAppBar';
import CustomSearch from '../components/CustomSearch';
import SavedLocationWeatherCard from '../components/SavedLocationWeatherCard';
import { useWeatherAppState } from '../react-query-hooks/hooks';
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: '#1976d2',
            marginBottom: 12,
            textAlign: 'center'
        },
        wrapper: {
            margin: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        },
        savedLocationContainer: {
            marginTop: 12
        }
    }),
);

const Locations = (): JSX.Element => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { defaultLocation, isDefaultLocationLoading, savedLocation } = useWeatherAppState();

    return (
        <div className={classes.wrapper} id="locationsId">
            <WeatherAppBar title={t('app-title')} />
            <>
                <CustomSearch />
                {defaultLocation && defaultLocation.length === 0 && !isDefaultLocationLoading ? (
                    <Typography variant="body2" gutterBottom>
                        Geolocation is not supported by this browser.
                    </Typography>
                ) : <></>}
                <Grid container spacing={3} className={classes.savedLocationContainer} >
                    {defaultLocation && defaultLocation?.length ? (
                        <Grid item xs key={`default-location-0`}>
                            <SavedLocationWeatherCard location={defaultLocation} isDefault={true} />
                        </Grid>
                    ) : <></>}
                    {savedLocation && savedLocation?.length ? savedLocation.map((location: number[], index: number) => (
                        <Grid item xs key={`default-location-${index}`}>
                            <SavedLocationWeatherCard location={location} />
                        </Grid>
                    ))
                        : <></>}
                </Grid>
            </>

        </div>

    )
}

export default Locations;