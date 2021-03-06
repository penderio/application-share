import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'emotion'
import ShareItem from './ShareItem'
import Select from '@pndr/select'
import Button from '@pndr/button'
import close from '@pndr/icons/lib/close3'
import spinner from '@pndr/spinner'

export default class CollaboratorItem extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        roleId: PropTypes.string.isRequired,
        onRoleIdChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        removing: PropTypes.bool,
        updating: PropTypes.bool,
        roles: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        updateRoleDisabled: PropTypes.bool
    }

    static defaultProps = {
        removing: false,
        updating: false,
        updateRoleDisabled: false
    }


    render() {

        const {id} = this.props

        return (
            <ShareItem
                imageUrl={this.props.imageUrl}
                name={this.props.name}
                description={this.props.description}
            >
                {this.props.updating ? (
                    <div
                        className={css`
                            height: 16px;
                            margin-right: 16px;
                        `}
                    >
                        {spinner({
                            width: 16
                        })}
                    </div>
                ) : null}
                <div
                    className={css`
                            width: 160px;
                            margin-right: 16px;
                        `}
                >
                    <Select
                        value={this.props.roleId}
                        alignLeft={true}
                        options={this.props.roles}
                        disabled={this.props.updateRoleDisabled}
                        onChange={({value}) => this.props.onRoleIdChange({id, value})}
                    />
                </div>
                <div>
                    <Button
                        type={'button'}
                        icon={this.props.removing ? spinner : close}
                        className={css`
                            height: 38px;
                        `}
                        onClick={() => this.props.onRemove({id})}
                    >
                        {this.props.removing ? 'Removing...' : 'Remove'}
                    </Button>
                </div>
            </ShareItem>
        )
    }
}