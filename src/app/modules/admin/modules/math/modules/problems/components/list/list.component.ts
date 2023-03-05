import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
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
import { BehaviorSubject, combineLatestWith, map, Subject } from 'rxjs'
import { ProblemService } from '../../services/problem.service'
import { AddEditComponent, ModalType } from '../add-edit/add-edit.component'
import { SubSink } from 'subsink'
import { ProblemOrder } from '../../models/problem-order'
import { ProblemOrderService } from '../../services/problem-order.service'

const headers = [
  (() => {
    const t = new TableHeaderItem({ data: $localize`ID` })
    t.sortable = false
    return t
  })(),
  (() => new TableHeaderItem({ data: $localize`Body` }))(),
  (() => {
    const t = new TableHeaderItem({ data: $localize`Order` })
    t.compare = (one, two) => {
      if (one.data === null && two.data === null) return 0
      if (one.data === null) return 1
      if (two.data === null) return -1

      return one.data - two.data
    }
    return t
  })(),
  (() => {
    const t = new TableHeaderItem({ data: $localize`Actions` })
    t.sortable = false
    return t
  })(),
]

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  subsink = new SubSink()
  emptyTableModel = Table.skeletonModel(10, 2)
  loaded$ = this.problemService.loaded$
  orderList$ = new BehaviorSubject<ProblemOrder>([])
  model$ = this.problemService.entities$.pipe(
    combineLatestWith(this.orderList$),
    map(([problems, order]) => {
      const model = new TableModel()
      model.header = headers
      let data: TableRow[] = []
      for (const problem of problems) {
        const o = order.indexOf(problem.id)
        data = [
          ...data,
          new TableRow(
            new TableItem({ data: problem.id }),
            new TableItem({ data: problem.body }),
            new TableItem({ data: o > -1 ? o + 1 : null }),
            new TableItem({
              data: problem.id,
              template: this.overflowMenuItemTemplate,
            })
          ),
        ]
      }
      model.data = data
      model.sort(2)
      return model
    })
  )
  orderUpdateRequired$ = new Subject<void>()

  constructor(
    private problemService: ProblemService,
    private problemOrderService: ProblemOrderService,
    private iconService: IconService,
    private modalService: ModalService
  ) {
    this.iconService.registerAll([TrashCan16])
  }

  ngOnInit() {
    this.problemService.getAll()
    this.updateOrder()
    this.subsink.sink = this.orderUpdateRequired$.subscribe(() => {
      this.updateOrder()
    })
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }

  addButton() {
    this.modalService.create({
      component: AddEditComponent,
      inputs: {
        type: ModalType.ModalTypeAdd,
        editID: undefined,
        orderUpdateRequired$: this.orderUpdateRequired$,
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
        orderUpdateRequired$: this.orderUpdateRequired$,
      },
    })
  }

  deleteButton(id: string) {
    this.problemService.delete(id)
  }

  updateOrder() {
    this.problemOrderService.list().subscribe((data) => {
      this.orderList$.next(data)
    })
  }
}
