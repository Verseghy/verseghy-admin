import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'
import {
  IconService,
  ModalService,
  Table,
  TableHeaderItem,
  TableItem,
  TableModel,
  TableRow,
} from 'carbon-components-angular'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TrashCan16 } from '@carbon/icons'
import { map } from 'rxjs'
import { ProblemService } from '../../services/problem.service'
import { AddEditComponent, ModalType } from '../add-edit/add-edit.component'

const headers = [
  new TableHeaderItem({ data: $localize`ID` }),
  new TableHeaderItem({ data: $localize`Body` }),
  new TableHeaderItem({ data: $localize`Actions` }),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  emptyTableModel = Table.skeletonModel(10, 2)
  loaded$ = this.problemService.loaded$
  model$ = this.problemService.entities$.pipe(
    map((problems) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const problem of problems) {
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: problem.id }),
            new TableItem({ data: problem.body }),
            new TableItem({
              data: problem.id,
              template: this.overflowMenuItemTemplate,
            })
          ),
        ]
      }
      model.data = data
      return model
    })
  )

  constructor(
    private problemService: ProblemService,
    private iconService: IconService,
    private modalService: ModalService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.problemService.getAll()
  }

  addButton() {
    this.modalService.create({
      component: AddEditComponent,
      inputs: {
        type: ModalType.ModalTypeAdd,
        editID: undefined,
      },
    })
  }

  @ViewChild('overflowMenuItemTemplate', { static: false })
  protected overflowMenuItemTemplate!: TemplateRef<never>

  editButton(id: string) {
    this.modalService.create({
      component: AddEditComponent,
      inputs: {
        type: ModalType.ModalTypeEdit,
        editID: id,
      },
    })
  }

  deleteButton(id: string) {
    this.problemService.delete(id)
  }
}
