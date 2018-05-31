import React from 'react';
import { indexOf, chunk, map, size } from 'lodash';
import {connect} from 'react-redux';
import { setSelectedColumn } from '../../actions';
import Modal from './Modal';
import Icon from './Icon';
import Button from './Button';
import Checkbox from './Checkbox';

class FilterColumn extends React.Component {
  state = {
    active: false,
    setup: {
      mobile: {
        partial: 3,
        responsiveness: 'mobile',
        hidden: 'tablet',
      },
      desktop: {
        partial: 3,
        responsiveness: 'tablet',
        hidden: 'mobile',
      },
    },
  }

  /**
   * toggle filter selection
   * set new state of column selection
   */
  toggleFilterSelection = () => this.setState({
    ...this.state,
    active: !this.state.active,
  });

  /**
   * set selected column
   */
  update = e => {
    const { setSelectedColumn, home_filter: {selected_columns} } = this.props;
    let indexOfColumn = -1; /* get index of checkbox name */
    let temp = selected_columns; /* get selected columns */

    indexOfColumn = indexOf(selected_columns, e.target.name);

    /* candition if to add or to remove column */
    if (e.target.checked) {
      /* check if column already selected */
      if (indexOfColumn < 0) {
        /* add target column */
        temp.push(e.target.name);
      }
    } else {
      /* remove target column */
      temp = temp.filter((col, i) => i !== indexOfColumn);
    }
    /* update column reducer */
    setSelectedColumn(temp);
  }

  /**
   * assign checkbox in one row
   */
  mapCheckBox = cols => {
    const { home_filter: { selected_columns } } = this.props;
    let retVal = [];

    retVal = map(cols, (col, key2) => {
      const isChecked = indexOf(selected_columns, col) > -1;

      return (
        <div className="column" key={key2}>
          <Checkbox name={col} checked={isChecked} onChange={this.update} />
        </div>
      );
    });

    return retVal;
  }

  /**
   * create checkbox according to the list of column
   */
  generateCheckBox = breakpoint => {
    /* set checkbox container class */
    const { home_filter } = this.props;

    const { hidden, responsiveness, partial } = this.state.setup[breakpoint];

    const colclass = `columns is-hidden-${hidden} is-${responsiveness}`;
    const partials = chunk(home_filter.columns, partial); /* chuck columns */
    let retVal = [];

    /* map chunked columns and generate checkbox element */
    retVal = map(partials, (cols, key) => {
      const selectedColums = this.mapCheckBox(cols);

      /* empty division filler */
      while (size(selectedColums) < partial) {
        selectedColums.push(<div className="column" key={size(selectedColums)} />);
      }

      /* contain chucked checkbox per row */
      return (
        <div className={colclass} key={key}>
          {selectedColums}
        </div>
      );
    });

    return retVal;
  }

  /**
   * one of react lifecycle method
   */
  render() {
    const columnsDesktop = this.generateCheckBox('desktop');
    const columnsMobile = this.generateCheckBox('mobile');
    const { active } = this.state;

    const retVal = (
      <section>
        <div className="field">
          <p className="help">&nbsp;</p>
          <Button size="small" onClick={this.toggleFilterSelection}>
            <Icon icon={active ? 'minus' : 'plus'} />
            <span>DISPLAY COLUMNS</span>
          </Button>

          <Modal
            active={active}
            remove={this.toggleFilterSelection}
            ok={this.toggleFilterSelection}
            fadeBlock={this.toggleFilterSelection}
            title="FILTER COLUMNS"
          >
            <div hidden={!active} className="filter-column-checkboxes">
              {columnsDesktop}
              {columnsMobile}
            </div>
          </Modal>
        </div>
      </section>
    );

    return retVal;
  }
}

const mapStateToProps = ({ home_filter }) => ({ home_filter });
export default connect(mapStateToProps, { setSelectedColumn })(FilterColumn);
