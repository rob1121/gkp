import React from 'react';
import { DateRange } from 'react-date-range';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm:ss`;

export default class DatePicker extends React.Component {
  state = {
    endDateSelected: 0,
    isActive: false,
  };

  /**
  * set initial state of the page
  */
  componentDidMount() {
    const { onChange } = this.props;

    onChange([
      moment().startOf('day').format(DATE_TIME_FORMAT),
      moment().endOf('day').format(DATE_TIME_FORMAT),
    ]);
  }

  /**
  * update datepicker value and fetch query value
  *
  * @param {date} date momentjs object
  */
  update = date => {
    const ONLY_START_DATE_IS_SELECTED = 0;
    const START_END_DATE_IS_SELECTED = 1;
    const { onChange } = this.props;
    const { endDateSelected, isActive } = this.state;

    if (endDateSelected) {
      // set date range
      onChange([
        date.startDate.startOf('day').format(DATE_TIME_FORMAT),
        date.endDate.endOf('day').format(DATE_TIME_FORMAT),
      ]);

      // set date picker status
      this.setState({
        ...this.state,
        isActive: !isActive,
        endDateSelected: ONLY_START_DATE_IS_SELECTED,
      });
    } else {
      // set date picker status
      this.setState({
        ...this.state,
        endDateSelected: START_END_DATE_IS_SELECTED,
      });
    }
  }

  /**
   * toggle datepicker widgets
   */
  updateState = () => {
    this.setState({
      ...this.state,
      isActive: !this.state.isActive,
    });
  }

  /**
   * one of reactjs lifecycle methods which react elements to React DOM
   *
   * @return jsx
   */
  render() {
    const { date_range, name } = this.props;
    const from = moment(date_range[0]).format(DATE_FORMAT); // start date
    const to = moment(date_range[1]).format(DATE_FORMAT); // end date
    const { isActive } = this.state;

    // toggle date picker status
    const datePickerContainer = this.state.isActive ? 'active' : 'in-active';

    // toggle class attribute for field block
    const searchBlocker = isActive ? 'field-blocker' : '';

    return (
      <div>
        <div className="field">
          <p className="help is-default">
            {name.toUpperCase()}
          </p>
          <div className="field has-addons">
            {/* readonly input field */}
            <p className="control">
              <input className="input is-small" type="text" readOnly value={`${from} - ${to}`} />
            </p>

            {/* calendar toggle button */}
            <p className="control">
              <a className="button is-small" onClick={this.updateState} role="button" tabIndex="0">
                <span className="icon is-small">
                  <i className="fa fa-calendar" />
                </span>
              </a>
            </p>
          </div>
        </div>
        <div className={datePickerContainer} style={{ width: 400 }}>
          {/* datepicker component */}
          <DateRange
            onChange={this.update}
            theme={{
              Calendar: { width: 200 },
            }}
          />
        </div>

        {/* toggle fade blocker when datepicker is active */}
        <div className={searchBlocker} onClick={this.updateState} role="button" tabIndex="0" />
      </div>
    );
  }
}