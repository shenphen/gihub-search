import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import languageColor from 'utils/languageColor'

const useStyles = makeStyles({
    root: {},
    avatar: {
        width: '100%',
        marginBottom: 16
    },
    name: {
        fontSize: 26,
        lineHeight: '30px',
        fontWeight: 600,
        marginBottom: 12
    },
    description: {},
    repositoriesHeader: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 12
    },
    noRepositories: {
        textAlign: 'left'
    },
    repositoriesList: {
        color: '#586069',
        width: '100%',
        borderTop: '1px solid #e1e4e8'
    },
    repository: {
        padding: '24px 0',
        borderBottom: '1px solid #e1e4e8',
        '& h3': {
            fontSize: 20,
            color: '#0366d6',
            marginBottom: 12,
            '& a:hover': {
                textDecoration: 'underline'
            }
        }
    },
    repositoryExtras: {
        marginTop: 8,
        fontSize: 12,
        '& > span': {
            marginRight: 15
        }
    },
    circle: {
        position: 'relative',
        display: 'inline-block',
        top: 1,
        width: 12,
        height: 12,
        borderRadius: '50%'
    },
    star: {
        position: 'relative',
        top: 3,
        fill: 'currentColor'
    }
})

interface UserProps {
    name: string
    description: string
    avatar: string
    repositories: Repository[]
}

interface Repository {
    id: number
    name: string
    url: string
    description: string
    stars: number
    language: string
}

const User = ({ name, description, avatar, repositories }: UserProps) => {
    const classes = useStyles()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Grid item xs={4} md={12}>
                    <img
                        data-test="User-avatar"
                        className={classes.avatar}
                        src={avatar}
                        alt={`${name} avatar`}
                    />
                </Grid>
                <Grid item xs={8} md={12}>
                    <div className={classes.name} data-test="User-name">
                        {name}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.description} data-test="User-description">
                        {description}
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <h2 className={classes.repositoriesHeader}>Repositories</h2>
                {repositories.length > 0 ? (
                    <ul className={classes.repositoriesList} data-test="User-repositories-list">
                        {repositories.map(renderRepository)}
                    </ul>
                ) : (
                    <div className={classes.noRepositories} data-test="User-no-repositories">
                        User has no repositories
                    </div>
                )}
            </Grid>
        </Grid>
    )

    function renderRepository({ id, name, url, description, language, stars }: Repository) {
        return (
            <li key={id} className={classes.repository}>
                <h3>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                        {name}
                    </a>
                </h3>
                <div>{description}</div>
                <div className={classes.repositoryExtras}>
                    <span>
                        <span
                            className={classes.circle}
                            style={{
                                backgroundColor: languageColor(language)
                            }}
                        />
                        &nbsp;{language}
                    </span>
                    <a href={`${url}/stargazers`} rel="noopener noreferrer" target="_blank">
                        <svg
                            aria-label="star"
                            className={classes.star}
                            viewBox="0 0 14 16"
                            version="1.1"
                            width="14"
                            height="16"
                            role="img"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                            ></path>
                        </svg>
                        &nbsp;{stars}
                    </a>
                </div>
            </li>
        )
    }
}

export const UserSkeleton = () => {
    const classes = useStyles()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Grid item xs={4} md={12}>
                    <Skeleton variant="rect" height={288} />
                </Grid>
                <Grid item xs={8} md={12}>
                    <Skeleton component="div" height={56} />
                </Grid>
                <Grid item xs={12}>
                    <Skeleton component="div" height={60} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={8}>
                <h2 className={classes.repositoriesHeader}>Repositories</h2>
                <ul className={classes.repositoriesList}>
                    {[...Array(3)].map((_, index) => {
                        return (
                            <li key={index} className={classes.repository}>
                                <h3>
                                    <Skeleton height={20} />
                                </h3>
                                <div>
                                    <Skeleton height={16} />
                                </div>
                                <div className={classes.repositoryExtras}>
                                    <Skeleton height={16} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </Grid>
        </Grid>
    )
}

export default User
