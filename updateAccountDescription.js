import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateDesc from '@salesforce/apex/acctDescUpdate.updateDesc';

export default class acctDescUpdate extends LightningElement {
    isExecuting = false;
    _recordId;

    @api set recordId(value) {
        this._recordId = value;
    }   
    get recordId() {
        return this._recordId;
    }
    @api async invoke() {
       if (this.isExecuting) {
            return;
        }
        this.isExecuting = true;
        await this.sleep(2000);
        this.dispatchEvent(
            new ShowToastEvent({
                    title: 'Processing...',
                    message: 'Please wait while your assistant writes an Account Description.',
                    variant: 'success'
                })
            );
        updateDesc({
            acctId: this.recordId,
        })
        .then(result => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Your Account has been updated, please refresh the page',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Failed to update Account Description: ' + JSON.stringify(error),
                    variant: 'error'
                })
            );
        });

        this.isExecuting = false;
    }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
