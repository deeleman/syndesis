import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FilterField, NotificationType } from 'patternfly-ng';
import { IntegrationStore, ChangeEvent } from '@syndesis/ui/store';
import { IntegrationOverviews, IntegrationSupportService, Integration } from '@syndesis/ui/platform';
import { ModalService, NotificationService } from '@syndesis/ui/common';
import {
  FileUploader,
  FileItem,
  ParsedResponseHeaders
} from 'ng2-file-upload';

@Component({
  selector: 'syndesis-integration-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class IntegrationListPage implements OnInit {
  loading$: Observable<boolean>;
  public uploader: FileUploader;
  integrations$: Observable<Integration[]>;
  filteredIntegrations$: Subject<
    Integration[]
  > = new BehaviorSubject(<Integration[]>{});
  filterFields: Array<FilterField> = [
    /*
    {
      id: 'currentState',
      title: 'State',
      type: 'select',
      placeholder: 'Filter by state...',
      queries: [
        { id: 'published', value: 'Published' },
        { id: 'unpublished', value: 'Unpublished' },
        { id: 'draft', value: 'Draft' }
      ]
    }
    */
  ];

  constructor(
    private modalService: ModalService,
    private integrationSupportService: IntegrationSupportService,
    private integrationStore: IntegrationStore,
    public notificationService: NotificationService,
  ) {
    this.integrations$ = integrationStore.list;
    this.loading$ = integrationStore.loading;
  }

  ngOnInit() {
    this.integrationStore.loadAll();
    this.uploader = new FileUploader({
      url: this.integrationSupportService.importIntegrationURL(),
      disableMultipart: true,
      autoUpload: true
    });
    this.uploader.onCompleteItem = (
      item: FileItem,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      if (status === 200) {
        const changeEvents = JSON.parse(response) as ChangeEvent[];
        for ( const x of changeEvents ) {
          this.notificationService.popNotification({
            type: NotificationType.SUCCESS,
            header: 'Imported ' + x.kind,
            message: 'Your ' + x.kind + ' ' + x.id + ' has been imported',
            isPersistent: true,
          });
        }
      } else if (status === 400) {
        this.notificationService.popNotification({
          type: NotificationType.DANGER,
          header: 'Import Failed!',
          message: JSON.parse(response).userMsg,
          isPersistent: true,
        });
      } else {
        this.notificationService.popNotification({
          type: NotificationType.DANGER,
          header: 'Import Failed!',
          message: 'Your integration could not be imported.'
        });
      }
    };
  }

  /**
   * Function that displays a modal for importing a database.
   */
  showImportDialog() {
    this.uploader.clearQueue();
    this.modalService.show('importIntegration');
  }
}
